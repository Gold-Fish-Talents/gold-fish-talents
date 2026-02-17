import Typesense from 'typesense'

// Force update for lint check

const typesenseClientSingleton = () => {
  return new Typesense.Client({
    nodes: [{ host: process.env.TYPESENSE_HOST!, port: process.env.TYPESENSE_PORT!, protocol: 'http' }],
    apiKey: process.env.TYPESENSE_API_KEY ?? '',
  })
}

declare global {
  var typesenseGlobal: ReturnType<typeof typesenseClientSingleton> | undefined
}

const typesense = globalThis.typesenseGlobal ?? typesenseClientSingleton()

export default typesense

if (import.meta.env.NODE_ENV !== 'production') globalThis.typesenseGlobal = typesense
