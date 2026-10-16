<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Gold-Fish-Talents/gold-fish-talents/main/public/logo.png">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/Gold-Fish-Talents/gold-fish-talents/main/public/logo.png">
    <img alt="Gold Fish Talents" src="https://raw.githubusercontent.com/Gold-Fish-Talents/gold-fish-talents/main/public/logo.png" width="80">
  </picture>
</p>

<h1 align="center">Gold Fish Talents</h1>

<p align="center">
  <strong>End-to-end platform empowering brands to discover, manage, and collaborate with creative talents.</strong>
</p>

<p align="center">
  <a href="https://shirsendu-bairagi.betteruptime.com">
    <img src="https://uptime.betterstack.com/status-badges/v3/monitor/10aqw.svg" alt="Uptime Status">
  </a>
    <a href="https://github.com/Gold-Fish-Talents/gold-fish-talents/releases">
    <img src="https://img.shields.io/github/v/release/Gold-Fish-Talents/gold-fish-talents?include_prereleases&color=FED300&style=flat-square" alt="GitHub Release" />
  </a>

 <a href="https://bun.sh">
    <img src="https://img.shields.io/badge/Bun-1.4.0-black?logo=bun&logoColor=white&style=flat-square" alt="Bun 1.4" />
  </a>
  <a href="https://tauri.app">
    <img src="https://img.shields.io/badge/Tauri-2.12-24C8DB?logo=tauri&logoColor=white" alt="Tauri 2">
  </a>
  <a href="https://nuxt.com">
    <img src="https://img.shields.io/badge/Nuxt-4.5.2-00DC82?logo=nuxt" alt="Nuxt 4">
  </a>
  <a href="https://github.com/Gold-Fish-Talents/gold-fish-talents/actions/workflows/integrate.yml">
    <img src="https://github.com/Gold-Fish-Talents/gold-fish-talents/actions/workflows/integrate.yml/badge.svg" alt="Nuxt CI">
  </a>
  <a href="https://github.com/Gold-Fish-Talents/gold-fish-talents/actions/workflows/deploy.yml">
    <img src="https://github.com/Gold-Fish-Talents/gold-fish-talents/actions/workflows/deploy.yml/badge.svg" alt="Nuxt CD">
  </a>
  <a href="https://github.com/Gold-Fish-Talents/gold-fish-talents/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/Gold-Fish-Talents/gold-fish-talents?color=FED300" alt="License: GPL-3.0">
  </a>
</p>

---

## Overview

**Gold Fish Talents** is an all-in-one talent discovery, portfolio presentation, and collaboration platform. Built as a high-performance Nuxt 4 application, it unifies a web portal, cross-platform desktop application, and mobile client into a single codebase. It integrates sub-millisecond search indexing, headless CMS database synchronization, interactive 3D graphics, real-time geolocation mapping, and containerized microservices for talent booking and digital document workflows.

### Features

- 🌐 **Universal Cross-Platform Client**: Runs as an SSR/PWA web app and native desktop (macOS, Windows, Linux) and mobile (Android) applications via Tauri v2.
- ⚡ **Instant Search & Filtering**: Sub-millisecond talent querying, filtering, and geolocation matching powered by a Typesense 29.0 engine.
- 🗄️ **Headless CMS & Media Pipeline**: Synchronized with Notion databases for dynamic portfolio data, automated CDN image routing, and steganographic processing.
- 🔐 **Dual Auth & Caching**: Supports passwordless Email OTP and Google OAuth 2.0 flows with Nitro server route caching (SWR) and session management.
- 📱 **Progressive Web App & Push**: Workbox offline asset caching and Web Push notifications via VAPID keys and background service workers.
- 🐋 **Production Swarm Ready**: Scalable multi-container orchestration with Docker Swarm, integrated health checks, Cloudreve storage, Documenso signing, and Novu notifications.

---

## Visual Preview

<p align="center">
  <img src="https://raw.githubusercontent.com/Gold-Fish-Talents/gold-fish-talents/main/public/previews/landing.webp" alt="Gold Fish Talents Landing Page" width="100%">
</p>

---

## Architecture & Technology Stack

| Layer                  | Technologies                                                      | Description                                                                     |
| :--------------------- | :---------------------------------------------------------------- | :------------------------------------------------------------------------------ |
| **Frontend Framework** | Nuxt 4 (`^4.6.1`), Vue 3 (`^3.5.44`), TypeScript                  | Vue 3 Composition API with Nitro server engine and SSR hydration.               |
| **Desktop & Mobile**   | Tauri v2 (`^2.10.0`), Rust (`edition 2021`)                       | Native binary wrapper generating macOS, Linux, Windows, and Android builds.     |
| **Styling & UI**       | Tailwind CSS (`^6.14.0`), `@nuxtjs/color-mode`                    | Dark/light theme support (dark preference) with utility-first CSS.              |
| **3D & Graphics**      | Three.js (`^0.186.1`), TresJS (`@tresjs/nuxt`, `@tresjs/cientos`) | Declarative WebGL and 3D scene rendering in Vue.                                |
| **Maps & Location**    | MapLibre GL (`nuxt-maplibre: ^1.2.2`)                             | Interactive vector maps and talent coordinate visualization.                    |
| **Search Engine**      | Typesense (`typesense: ^3.1.1`, Docker `29.0`)                    | Full-text, faceted, and geopoint distance searching.                            |
| **CMS & Data Source**  | Notion API (`@notionhq/client`, `notion-to-md`)                   | Headless relational content model for talents, projects, and assets.            |
| **Auth & Security**    | `nuxt-auth-utils`, Zod (`^4.6.7`), Regle                          | Google OAuth 2.0, OTP email tokens, encrypted cookies, and schema validation.   |
| **Notifications**      | Web Push (`web-push: ^3.6.7`), Novu                               | Push subscription management and browser service worker notifications.          |
| **Auxiliary Services** | Cloudreve (v4.17.0), Documenso (v2.14.0), Browserless             | File storage (PostgreSQL 17 + Redis), e-signatures, and headless browser tasks. |

---

## Prerequisites & External Dependencies

Before running or deploying the project, ensure the following runtimes and system dependencies are available:

### Supported Runtimes

- **Bun**: `^1.2.9` (Project lockfile standard: `bun@1.4.3` — **recommended**)
- **Node.js**: `^20.15.0 || ^22.11.0` (Optional alternative engine)
- **Rust / Cargo**: `1.77.2+` (Required for building Tauri desktop and mobile targets)
- **Java & Android SDK / NDK**: Java 17, Android NDK `27.0.11902837` (Required only for Android builds)

### System Tools

- **[gitleaks](https://github.com/gitleaks/gitleaks)**: Required for secret scanning during development (`bun run detect`).
- **[ffmpeg](https://ffmpeg.org)**: Required for media duration and dimension analysis during CDN sync tasks.
- **[steghide](https://steghide.sourceforge.net)**: Installed in production Docker image for steganographic asset processing.
- **[k6](https://k6.io)**: Required for running performance load tests (`bun run test:load`).

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Gold-Fish-Talents/gold-fish-talents.git
cd gold-fish-talents
```

### 2. Configure Environment Variables

Create your local `.env` configuration from the provided template:

```bash
cp .env.example .env
```

Key environment configurations defined in `.env.example`:

| Environment Variable              | Description                                                |
| :-------------------------------- | :--------------------------------------------------------- |
| `DATABASE_URL`                    | Application database connection string                     |
| `NOTION_API_KEY`                  | Notion integration API key                                 |
| `NUXT_PRIVATE_NOTION_DB_ID`       | Notion database IDs JSON mapping                           |
| `TYPESENSE_HOST`                  | Hostname for Typesense instance (`localhost` for dev)      |
| `TYPESENSE_PORT`                  | Port for Typesense instance (`8108`)                       |
| `TYPESENSE_API_KEY`               | Authentication key for Typesense search cluster            |
| `NUXT_SESSION_PASSWORD`           | Minimum 32-character encryption secret for session cookies |
| `NUXT_OAUTH_GOOGLE_CLIENT_ID`     | Google OAuth Client ID                                     |
| `NUXT_OAUTH_GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret                                 |
| `NUXT_PUBLIC_SITE_URL`            | Public canonical site URL                                  |
| `NUXT_PUBLIC_CDN_URL`             | Asset CDN base URL                                         |
| `NUXT_PUBLIC_VAPID_KEY`           | Public VAPID key for Web Push notifications                |
| `NUXT_PRIVATE_VAPID_KEY`          | Private VAPID key for Web Push signing                     |
| `NUXT_PRIVATE_MAP_API_KEY`        | Map tiles API authentication key                           |

### 3. Install Dependencies

Install project packages using Bun:

```bash
bun install --frozen-lockfile
```

### 4. Run Development Servers

#### Web Application (Nuxt 4)

Starts the local development server on **http://localhost:3003**:

```bash
bun run dev
```

#### Tauri Desktop Application

Launches the native desktop window connected to the Nuxt dev server:

```bash
bun run tauri:dev
```

#### Android Mobile Application

Starts the Android emulator/device development build:

```bash
bun run tauri:dev:mobile
```

---

## Server API Reference

The Nuxt Nitro engine exposes REST endpoints under the `/api` route.

| Method   | Route                              | Description                                                    | Query / Body Parameters                                     |
| :------- | :--------------------------------- | :------------------------------------------------------------- | :---------------------------------------------------------- |
| `GET`    | `/api/health`                      | Service health status, build version, timestamp, and host node | None                                                        |
| `GET`    | `/api/v1/talents/models`           | Paginated search across active models via Typesense            | `query`, `queryBy`, `filterBy`, `sortBy`, `page`, `perPage` |
| `GET`    | `/api/v1/talents/models/:slug`     | Detailed profile for a specific talent (Cached SWR: 60s)       | Route parameter: `slug`                                     |
| `GET`    | `/api/v1/talents/models/dashboard` | Dashboard summary metrics for logged-in talent                 | Authenticated session                                       |
| `GET`    | `/api/v1/projects`                 | List active projects and released portfolio photos             | `modelSlug` (optional)                                      |
| `GET`    | `/api/v1/projects/:slug`           | Individual project details and associated media                | Route parameter: `slug`                                     |
| `POST`   | `/api/notification/push/subscribe` | Register a client device Web Push subscription                 | `{ endpoint, keys: { p256dh, auth } }`                      |
| `POST`   | `/api/search/sync`                 | Re-index Notion talent entries into Typesense collection       | None                                                        |
| `DELETE` | `/api/search/reset`                | Recreate Typesense `model` schema and reset collection         | None                                                        |
| `GET`    | `/api/payment`                     | Generate UPI payment intent deep link                          | None                                                        |

---

## Deployment Guide

### Local Multi-Container Dev Stack (Docker Compose)

Spin up the local application alongside Typesense 29.0 and Browserless Chromium:

```bash
# Start dev services (App: http://localhost:4500, Typesense: http://localhost:8108)
docker compose up -d
```

### Production Deployment (Docker Swarm)

Production deployments run on a Docker Swarm cluster using `docker-compose.prod.yml`.

#### 1. Initialize Docker Swarm (Manager Node)

```bash
docker swarm init --advertise-addr <MANAGER-IP>
```

#### 2. Join Worker Nodes (Optional)

```bash
docker swarm join --token <WORKER-TOKEN> <MANAGER-IP>:2377
```

#### 3. Prepare Persistent Volumes

Ensure the data mount directories exist on the host at `/root/gold-fish-talents`:

```bash
mkdir -p /root/gold-fish-talents/.data /root/gold-fish-talents/static
```

#### 4. Deploy Docker Stack

Deploy the application and Typesense services:

```bash
docker stack deploy --compose-file docker-compose.prod.yml gold-fish-talents
```

#### 5. Scale & Inspect Services

```bash
# Scale the web app service replicas
docker service scale gold-fish-talents_app=2

# Inspect running stack services
docker service ls
docker service ps gold-fish-talents_app
```

---

## Development Tasks

<details>
<summary><strong>View all available package scripts</strong></summary>

| Script                       | Command                                                                                                    | Purpose                                                              |
| :--------------------------- | :--------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------- |
| `bun run dev`                | `nuxt dev`                                                                                                 | Start Nuxt development server on port `3003`                         |
| `bun run build`              | `nuxt build`                                                                                               | Build production server and client bundles into `.output/`           |
| `bun run generate`           | `nuxt generate`                                                                                            | Prerender static pages into `dist/`                                  |
| `bun run preview`            | `nuxt preview`                                                                                             | Preview production build locally                                     |
| `bun run start`              | `node --env-file=.env.prod .output/server/index.mjs`                                                       | Start production server using Node runtime                           |
| `bun run clean`              | `nuxt cleanup && (cd src-tauri && cargo clean)`                                                            | Clean Nuxt cache and Cargo build artifacts                           |
| `bun run lint`               | `eslint . --fix`                                                                                           | Lint codebase with ESLint and auto-fix violations                    |
| `bun run format`             | `prettier . --write`                                                                                       | Format files using Prettier                                          |
| `bun run detect`             | `gitleaks git --verbose`                                                                                   | Scan git history for committed secrets                               |
| `bun run test:load`          | `k6 run test/load.test.ts`                                                                                 | Execute k6 load test scenarios                                       |
| `bun run docker:build`       | `docker build --build-arg VERSION=dev --build-arg BUILD_TIME=now -t gold-fish-talents:dev .`               | Build local production Docker image                                  |
| `bun run docker:start`       | `docker run --detach --name gold-fish-talents-dev --env-file .env.prod -p 4000:3000 gold-fish-talents:dev` | Run built Docker image on port 4000                                  |
| `bun run tauri`              | `tauri`                                                                                                    | Execute Tauri CLI commands                                           |
| `bun run tauri:dev`          | `tauri dev`                                                                                                | Launch Tauri desktop application in development mode                 |
| `bun run tauri:build`        | `tauri build`                                                                                              | Compile release desktop bundle for current OS                        |
| `bun run tauri:dev:mobile`   | `tauri android dev`                                                                                        | Launch Tauri development client on connected Android device/emulator |
| `bun run tauri:build:mobile` | `tauri android build`                                                                                      | Compile Android universal APK and AAB bundles                        |

</details>

---

## License

This project is open-source software licensed under the [GNU General Public License v3.0 (GPL-3.0)](https://github.com/Gold-Fish-Talents/gold-fish-talents/blob/main/LICENSE).

<br>

<a href="https://github.com/Gold-Fish-Talents/gold-fish-talents/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Gold-Fish-Talents/gold-fish-talents" alt="Contributors">
</a>
