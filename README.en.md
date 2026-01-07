# Fullstack Starter

English | [한국어](./README.md)

Production-ready fullstack monorepo template with Next.js 16, FastAPI, Flutter, and GCP infrastructure.

## Key Features

- **Modern Stack**: Next.js 16 + React 19, FastAPI, Flutter 3.32, TailwindCSS v4
- **Type Safety**: Full type support with TypeScript, Pydantic, and Dart
- **Authentication**: OAuth with better-auth (Google, GitHub, Kakao)
- **Internationalization**: next-intl (web), Flutter ARB (mobile)
- **Auto-generated API Clients**: Orval (web), swagger_parser (mobile)
- **Infrastructure as Code**: Terraform + GCP (Cloud Run, Cloud SQL, Cloud Storage)
- **CI/CD**: GitHub Actions + Workload Identity Federation (keyless deployment)
- **AI Agent Support**: Guidelines for AI coding agents (Gemini, Claude, etc.)

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 16, React 19, TailwindCSS v4, shadcn/ui, TanStack Query, Jotai |
| **Backend** | FastAPI, SQLAlchemy (async), PostgreSQL 16, Redis 7 |
| **Mobile** | Flutter 3.32, Riverpod 3, go_router 17 |
| **Worker** | FastAPI + CloudTasks/PubSub |
| **Infrastructure** | Terraform, GCP (Cloud Run, Cloud SQL, Cloud Storage, CDN) |
| **CI/CD** | GitHub Actions, Workload Identity Federation |

## Prerequisites

- [mise](https://mise.jdx.dev/) - Runtime version manager
- [Docker](https://www.docker.com/) - Local infrastructure
- [Terraform](https://www.terraform.io/) - Cloud infrastructure (optional)

## Quick Start

### 1. Install Runtimes

```bash
# Install mise (if not installed)
curl https://mise.run | sh

# Install all runtimes (Node 24, Python 3.13, Flutter 3.32, pnpm 10, uv)
mise install
```

### 2. Install Dependencies

```bash
# Root dependencies (JS/TS)
pnpm install

# API dependencies
cd apps/api && uv sync --frozen

# Worker dependencies
cd apps/worker && uv sync --frozen

# Mobile dependencies
cd apps/mobile && flutter pub get
```

### 3. Start Local Infrastructure

```bash
mise run infra:up
```

This starts:
- PostgreSQL (5432)
- Redis (6379)
- MinIO (9000, 9001)

### 4. Run Database Migrations

```bash
mise run migrate
```

### 5. Start Development Servers

```bash
# Start all services (recommended)
mise run dev

# Or start individually
mise run dev:api    # API server
mise run dev:web    # Web server
mise run dev:worker # Worker
```

## Project Structure

```
fullstack-starter/
├── apps/
│   ├── api/           # FastAPI backend
│   ├── web/           # Next.js frontend
│   ├── worker/        # Background worker
│   ├── mobile/        # Flutter mobile app
│   └── infra/         # Terraform infrastructure
├── packages/          # Shared packages
├── .agent/rules/      # AI agent guidelines
├── .serena/           # Serena MCP config
└── .github/workflows/ # CI/CD
```

## Commands

### mise Tasks (Recommended)

| Command | Description |
|---------|-------------|
| `mise run dev` | Start all services |
| `mise run lint` | Lint all apps |
| `mise run format` | Format all apps |
| `mise run test` | Test all apps |
| `mise run typecheck` | Type check |
| `mise run infra:up` | Start local infrastructure |
| `mise run infra:down` | Stop local infrastructure |
| `mise run migrate` | Run DB migrations |
| `mise run gen:api` | Generate API client |

### App-specific Commands

<details>
<summary>API (apps/api)</summary>

| Command | Description |
|---------|-------------|
| `poe dev` | Start development server |
| `poe test` | Run tests |
| `poe lint` | Run linter |
| `poe format` | Format code |
| `poe migrate` | Run migrations |
| `poe migrate-create "desc"` | Create new migration |

</details>

<details>
<summary>Web (apps/web)</summary>

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm test` | Run tests |
| `pnpm lint` | Run linter |
| `pnpm gen:api` | Generate API client from OpenAPI |

</details>

<details>
<summary>Mobile (apps/mobile)</summary>

| Command | Description |
|---------|-------------|
| `flutter run` | Run on device/simulator |
| `flutter test` | Run tests |
| `flutter analyze` | Run analyzer |
| `flutter build apk` | Build Android APK |
| `flutter build ios` | Build iOS |

</details>

<details>
<summary>Infrastructure (apps/infra)</summary>

| Command | Description |
|---------|-------------|
| `pnpm plan` | Preview Terraform changes |
| `pnpm apply` | Apply Terraform changes |

</details>

## Configuration

### Environment Variables

Copy example files and configure:

```bash
# API
cp apps/api/.env.example apps/api/.env

# Web
cp apps/web/.env.example apps/web/.env

# Infra
cp apps/infra/terraform.tfvars.example apps/infra/terraform.tfvars
```

### GitHub Actions Secrets

Set these secrets in your repository:

| Secret | Description |
|--------|-------------|
| `GCP_PROJECT_ID` | GCP project ID |
| `GCP_REGION` | GCP region (e.g., `asia-northeast3`) |
| `WORKLOAD_IDENTITY_PROVIDER` | From Terraform output |
| `GCP_SERVICE_ACCOUNT` | From Terraform output |

## Deployment

### GitHub Actions (Recommended)

Push to `main` branch triggers automatic deployment:
- `apps/api/` changes → Deploy API
- `apps/web/` changes → Deploy Web
- `apps/worker/` changes → Deploy Worker

### Manual Deployment

```bash
# Build and push Docker images
cd apps/api
docker build -t gcr.io/PROJECT_ID/api .
docker push gcr.io/PROJECT_ID/api

# Deploy to Cloud Run
gcloud run deploy api --image gcr.io/PROJECT_ID/api --region REGION
```

## AI Agent Support

This template is designed to work with AI coding agents (Gemini, Claude, etc.).

- `.agent/rules/` - Guidelines for AI agents
- `.serena/` - Serena MCP configuration

## Documentation

- [Build Guide](.agent/rules/build-guide.md)
- [Lint & Format Guide](.agent/rules/lint-format-guide.md)
- [Test Guide](.agent/rules/test-guide.md)

## License

MIT

## Sponsors

If this project helped you, please consider buying me a coffee!

<a href="https://www.buymeacoffee.com/firstfluke" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
