# Fullstack Starter - Project Overview

## Description
Modern fullstack monorepo template with Next.js 16, FastAPI, Flutter, and GCP infrastructure.

## Tech Stack

### Frontend (apps/web)
- **Framework**: Next.js 16 with React 19
- **Styling**: TailwindCSS v4 + shadcn/ui
- **State**: Jotai (global), TanStack Query (server)
- **Auth**: better-auth
- **i18n**: next-intl
- **API Client**: Orval (OpenAPI codegen)
- **Testing**: Vitest + Playwright

### Backend (apps/api)
- **Framework**: FastAPI with Python 3.13
- **Database**: PostgreSQL 16 with SQLAlchemy async
- **Cache**: Redis 7.2
- **Migrations**: Alembic
- **Storage**: GCS / MinIO
- **Package Manager**: uv + poe tasks

### Worker (apps/worker)
- **Framework**: FastAPI (HTTP-based worker)
- **Queue**: Cloud Tasks / Pub/Sub
- **Retry**: tenacity

### Mobile (apps/mobile)
- **Framework**: Flutter 3
- **State**: Riverpod
- **Routing**: go_router
- **API Client**: swagger_parser (OpenAPI codegen)
- **l10n**: Flutter intl

### Infrastructure (apps/infra)
- **IaC**: Terraform
- **Cloud**: GCP (Cloud Run, Cloud SQL, Memorystore, GCS, Cloud Tasks, Pub/Sub)
- **CI/CD**: GitHub Actions with Workload Identity Federation

## Project Structure
```
fullstack-starter/
├── apps/
│   ├── api/          # FastAPI backend
│   ├── web/          # Next.js frontend
│   ├── worker/       # Background worker
│   ├── mobile/       # Flutter mobile app
│   └── infra/        # Terraform infrastructure
├── packages/         # Shared packages (if needed)
├── docs/             # Documentation
└── [config files]    # Root configuration
```

## Key Patterns

### API Layer
- Feature-based module structure
- Repository pattern for data access
- Dependency injection via FastAPI Depends
- Abstract base classes for AI and Storage providers

### Web Layer
- App Router with Route Groups
- Server Components by default
- Client Components only when needed (interactivity, hooks)
- Colocation of components with routes

### Mobile Layer
- Feature-first architecture
- Riverpod for DI and state
- Freezed for immutable models

## Code Conventions

### Naming
- Files: kebab-case (e.g., `user-profile.tsx`)
- Components: PascalCase (e.g., `UserProfile`)
- Functions/Variables: camelCase (e.g., `getUserProfile`)
- Python: snake_case (e.g., `get_user_profile`)
- Constants: SCREAMING_SNAKE_CASE (e.g., `MAX_RETRY_COUNT`)

### TypeScript
- Prefer `interface` over `type` for object shapes
- Use `type` for unions, intersections, and utility types
- No `any` - use `unknown` and narrow types
- Prefer named exports over default exports

### Python
- Type hints required for all function signatures
- Async/await for all I/O operations
- Pydantic models for request/response schemas
- ABC for extensible components (AI providers, Storage, etc.)

## Important Files
- `mise.toml` - Runtime versions and task runner
- `biome.json` - JS/TS linting and formatting
- `apps/api/pyproject.toml` - Python dependencies and tasks
- `apps/web/package.json` - Web dependencies and scripts
- `apps/infra/variables.tf` - Infrastructure configuration
