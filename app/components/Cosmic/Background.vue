<script setup lang="ts">
import { AdditiveBlending, DoubleSide, Color, BufferGeometry, Float32BufferAttribute, BackSide } from 'three'
import { useTextures } from '@tresjs/cientos'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amp = 0.5;
    float freq = 1.0;
    for (int i = 0; i < 5; i++) {
      value += amp * noise(p * freq);
      freq *= 2.0;
      amp *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float d = length(p);
    float n = fbm(p * 2.5 + uTime * 0.05);
    float alpha = smoothstep(0.7, 0.0, d) * n;
    vec3 col = uColor * (0.4 + 0.6 * n);
    gl_FragColor = vec4(col, alpha);
  }
`

const nebulaUniforms = {
  uTime: { value: 0 },
  uColor: { value: new Color('#9AEAFA') },
}

// Star shader with twinkling effect
// Star shader with twinkling effect
const starVertexShader = `
  attribute float size;
  attribute float twinkleSpeed;
  attribute float twinkleOffset;
  
  uniform float uTime;
  
  varying float vIntensity;
  
  void main() {
    // Calculate twinkle intensity using sin wave with unique speed and offset per star
    float twinkle = sin(uTime * twinkleSpeed + twinkleOffset) * 0.5 + 0.5;
    vIntensity = 0.7 + twinkle * 0.3; // Range from 0.7 to 1.0 (less extreme dimming)
    
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z) * vIntensity;
    gl_Position = projectionMatrix * mvPosition;
  }
`

const starFragmentShader = `
  varying float vIntensity;
  
  void main() {
    // Create circular star with soft glow
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    
    // Soft glow falloff
    float glow = 1.0 - smoothstep(0.0, 0.5, dist);
    glow = pow(glow, 2.0);
    
    // Apply twinkle intensity
    float alpha = glow * vIntensity;
    
    // White color with slight blue tint
    vec3 color = vec3(0.9, 0.95, 1.0);
    
    gl_FragColor = vec4(color * glow * vIntensity, alpha);
  }
`

// Generate denser star field with smaller sizes
const createStarField = (count: number, radius: number) => {
  const geometry = new BufferGeometry()

  const positions = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  const twinkleSpeeds = new Float32Array(count)
  const twinkleOffsets = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    const i3 = i * 3

    // Even spherical distribution using cube root for uniform volume
    const r = radius * Math.pow(Math.random(), 1 / 3)
    const theta = 2 * Math.PI * Math.random()
    const phi = Math.acos(2 * Math.random() - 1)

    positions[i3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i3 + 2] = 1

    // Smaller, denser star sizes
    const sizeRand = Math.random()
    if (sizeRand > 0.98) {
      sizes[i] = 0.4 + Math.random() * 0.05 // Largest stars: 0.5-0.8 (very rare)
    } else if (sizeRand > 0.9) {
      sizes[i] = 0.35 + Math.random() * 0.05 // Medium stars: 0.35-0.5
    } else {
      sizes[i] = 0.25 + Math.random() * 0.2 // Small stars: 0.2-0.35 (most common)
    }

    // Slower twinkle speed
    twinkleSpeeds[i] = 1 + Math.random() * 0.3

    // Random offset for unique timing
    twinkleOffsets[i] = Math.random() * Math.PI * 2
  }

  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
  geometry.setAttribute('size', new Float32BufferAttribute(sizes, 1))
  geometry.setAttribute('twinkleSpeed', new Float32BufferAttribute(twinkleSpeeds, 1))
  geometry.setAttribute('twinkleOffset', new Float32BufferAttribute(twinkleOffsets, 1))

  return geometry
}

// Increase star count for denser field
const starGeometry = createStarField(15000, 50) // Increased from 8000 to 15000

const starUniforms = {
  uTime: { value: 0 },
}

let frameId: number | null = null

onMounted(() => {
  const animate = () => {
    nebulaUniforms.uTime.value += 0.016
    starUniforms.uTime.value += 0.016
    frameId = requestAnimationFrame(animate)
  }
  frameId = requestAnimationFrame(animate)
})

onBeforeUnmount(() => {
  if (frameId !== null) {
    cancelAnimationFrame(frameId)
    starGeometry.dispose()
  }
})

// Update the animation loop to rotate Earth
onMounted(() => {
  const animate = () => {
    nebulaUniforms.uTime.value += 0.016
    starUniforms.uTime.value += 0.016

    frameId = requestAnimationFrame(animate)
  }
  frameId = requestAnimationFrame(animate)
})

const texturePaths = ['/images/8081_earth.jpg']

const { textures } = useTextures(texturePaths)

// Atmosphere Glow Shaders
const atmosphereVertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const atmosphereFragmentShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  void main() {
    // Calculate intensity based on viewing angle (fresnel effect)
    float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
    
    // Atmospheric blue color
    vec3 atmosphereColor = vec3(0.3, 0.6, 1.0);
    
    // Apply intensity and color
    gl_FragColor = vec4(atmosphereColor, 1.0) * intensity;
  }
`
</script>

<template>
  <div class="pointer-events-none absolute inset-0 -z-10">
    <TresCanvas clear-color="#030719">
      <!-- Camera -->
      <TresPerspectiveCamera :args="[45, 1, 0.1, 1000]" :position="[0, 0, 10]" />

      <!-- Light -->
      <!-- 1. Subtle ambient for base illumination -->
      <!-- <TresAmbientLight :intensity="0.05" color="#0a1628" /> -->
      <!-- 2. Main Sun light from left (strong directional) -->
      <TresDirectionalLight :position="[-15, 3, 8]" :intensity="1.5" color="0x030719" />
      <!-- 3. Hemisphere light for atmospheric scattering -->
      <!-- <TresHemisphereLight :sky-color="0x87ceeb" :ground-color="0x0a1628" :intensity="0.3" /> -->
      <!-- 4. Rim light from behind left for atmosphere glow -->
      <!-- <TresPointLight :position="[-8, 2, -3]" :intensity="2" :distance="25" color="#4a9eff" /> -->
      <!-- 5. Subtle fill light on dark side (very weak) -->
      <!-- <TresPointLight :position="[8, 0, 5]" :intensity="0.15" :distance="15" color="#1e3a5f" /> -->
      <!-- 6. Top rim light for edge definition -->
      <!-- <TresPointLight :position="[-5, 8, 2]" :intensity="1.5" :distance="20" color="#6ba3d6" /> -->
      <!-- Keep your existing nebula point lights -->
      <!-- <TresPointLight :position="[220, 260, -80]" :intensity="40" :distance="650" :decay="1.7" color="#ff8c19" /> -->
      <!-- <TresPointLight :position="[-140, 260, -40]" :intensity="38" :distance="600" :decay="1.7" color="#f472b6" /> -->
      <!-- <TresPointLight :position="[40, 260, -260]" :intensity="42" :distance="700" :decay="1.7" color="#38bdf8" /> -->
      <!-- 1. Nebula (Background - furthest) -->
      <TresGroup :position="[0, 0, -50]">
        <TresMesh :rotation="[1.2, -0.2, 0.0]" :scale="[1.2, 1.2, 1]">
          <TresPlaneGeometry :args="[120, 120]" />
          <TresShaderMaterial
            :vertex-shader="vertexShader"
            :fragment-shader="fragmentShader"
            :uniforms="nebulaUniforms"
            :transparent="true"
            :blending="AdditiveBlending"
            :depth-write="false"
            :side="DoubleSide" />
        </TresMesh>
      </TresGroup>
      <!-- 2. Stars (Middle layer - behind earth) -->
      <TresGroup :position="[0, 0, -10]">
        <TresPoints :geometry="starGeometry">
          <TresShaderMaterial
            :vertex-shader="starVertexShader"
            :fragment-shader="starFragmentShader"
            :uniforms="starUniforms"
            :transparent="true"
            :blending="AdditiveBlending"
            :depth-write="false"
            :vertex-colors="false" />
        </TresPoints>
      </TresGroup>
      <!-- 3. Earth (Foreground - closest) -->
      <TresMesh v-if="textures[0]" :position="[0, 0, 0]" :rotation="[0, -0.5, 0]">
        <TresSphereGeometry :args="[2.5, 64, 64]" />
        <TresMeshStandardMaterial :map="textures[0]" />
      </TresMesh>
      <!-- Atmosphere Glow -->
      <TresMesh :position="[0, 0, 0]" :rotation="[0, -0.5, 0.3]">
        <TresSphereGeometry :args="[2.65, 64, 64]" />
        <TresShaderMaterial
          :vertex-shader="atmosphereVertexShader"
          :fragment-shader="atmosphereFragmentShader"
          :transparent="true"
          :blending="AdditiveBlending"
          :depth-write="false"
          :side="BackSide" />
      </TresMesh>
    </TresCanvas>
  </div>
</template>
