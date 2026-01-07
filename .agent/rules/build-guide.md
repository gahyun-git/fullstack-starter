# Build Guide

## Quick Start

### Prerequisites
Ensure you have `mise` installed for runtime management.

```bash
# Install all runtimes
mise install

# Verify versions
mise current
```

## Build Commands

### Root (All Apps)
```bash
# Install all dependencies
pnpm install        # JS/TS packages
uv sync --frozen    # Python packages (in apps/api and apps/worker)
flutter pub get     # Flutter packages (in apps/mobile)

# Build all
pnpm build
```

### API (apps/api)
```bash
cd apps/api

# Install dependencies
uv sync --frozen

# Run development server
poe dev

# Run with auto-reload
poe dev:reload

# Build Docker image
docker build -t api .
```

### Web (apps/web)
```bash
cd apps/web

# Install dependencies
pnpm install

# Development server
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Generate API client from OpenAPI
pnpm generate:api

# Build Docker image
docker build -t web .
```

### Worker (apps/worker)
```bash
cd apps/worker

# Install dependencies
uv sync --frozen

# Run development server
poe dev

# Build Docker image
docker build -t worker .
```

### Mobile (apps/mobile)
```bash
cd apps/mobile

# Install dependencies
flutter pub get

# Generate code (Freezed, Riverpod, etc.)
flutter pub run build_runner build --delete-conflicting-outputs

# Generate l10n
flutter gen-l10n

# Generate API client
dart run swagger_parser:generate

# Run app
flutter run

# Build APK
flutter build apk --release

# Build iOS
flutter build ios --release
```

### Infrastructure (apps/infra)
```bash
cd apps/infra

# Initialize Terraform
terraform init -backend-config="bucket=your-tfstate-bucket"

# Plan changes
terraform plan -var-file="terraform.tfvars"

# Apply changes
terraform apply -var-file="terraform.tfvars"

# Destroy (careful!)
terraform destroy -var-file="terraform.tfvars"
```

## Docker Compose (Local Development)

### Start Infrastructure
```bash
cd apps/api
docker compose -f docker-compose.infra.yml up -d
```

This starts:
- PostgreSQL (port 5432)
- Redis (port 6379)
- MinIO (ports 9000, 9001)

### Stop Infrastructure
```bash
docker compose -f docker-compose.infra.yml down
```

### Reset Infrastructure (with data)
```bash
docker compose -f docker-compose.infra.yml down -v
```

## Database Migrations

### Create Migration
```bash
cd apps/api
poe migration "description of changes"
```

### Apply Migrations
```bash
cd apps/api
poe migrate
```

### Rollback Migration
```bash
cd apps/api
alembic downgrade -1
```

## Common Build Issues

### Python Import Errors
```bash
# Ensure virtual environment is activated
source .venv/bin/activate  # or let mise handle it

# Reinstall dependencies
uv sync --frozen
```

### Node Module Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Flutter Build Issues
```bash
# Clean and rebuild
flutter clean
flutter pub get
flutter pub run build_runner build --delete-conflicting-outputs
```

### Terraform State Issues
```bash
# Refresh state from cloud
terraform refresh -var-file="terraform.tfvars"

# Import existing resource
terraform import -var-file="terraform.tfvars" google_storage_bucket.uploads your-bucket-name
```
