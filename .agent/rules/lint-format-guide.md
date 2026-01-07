# Lint & Format Guide

## Overview

This project uses:
- **Biome** for JavaScript/TypeScript (lint + format)
- **Ruff** for Python (lint + format)
- **dart analyze** for Dart/Flutter
- **terraform fmt** for Terraform

## Quick Commands

### Check All
```bash
# From root
pnpm lint          # Biome check
pnpm format:check  # Biome format check

# Python (in apps/api or apps/worker)
poe lint           # Ruff check
poe format:check   # Ruff format check

# Flutter (in apps/mobile)
flutter analyze

# Terraform (in apps/infra)
terraform fmt -check -recursive
```

### Fix All
```bash
# From root
pnpm lint:fix      # Biome fix
pnpm format        # Biome format

# Python
poe lint:fix       # Ruff fix
poe format         # Ruff format

# Terraform
terraform fmt -recursive
```

## Biome (JavaScript/TypeScript)

### Configuration
See `biome.json` at project root.

### Key Rules
- Indent: 2 spaces
- Quotes: double
- Semicolons: required
- Trailing commas: all
- Line width: 100

### Lint Categories
- **Correctness**: Errors that will cause bugs
- **Suspicious**: Likely bugs or confusing code
- **Style**: Code style issues
- **Complexity**: Overly complex code
- **Security**: Potential security issues

### Ignored Patterns
- `node_modules/`
- `.next/`
- `dist/`
- `coverage/`
- Generated files (`*.gen.ts`)

### Editor Integration
```json
// .vscode/settings.json
{
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSave": true,
  "[typescript]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "biomejs.biome"
  }
}
```

## Ruff (Python)

### Configuration
See `ruff.toml` in `apps/api/` and `apps/worker/`.

### Key Rules
- Line length: 100
- Target: Python 3.13
- Indent: 4 spaces
- Quotes: double

### Rule Sets
- **E/W**: pycodestyle (errors/warnings)
- **F**: Pyflakes
- **I**: isort (import sorting)
- **UP**: pyupgrade
- **B**: flake8-bugbear
- **SIM**: flake8-simplify
- **ASYNC**: flake8-async

### Editor Integration
```json
// .vscode/settings.json
{
  "[python]": {
    "editor.defaultFormatter": "charliermarsh.ruff",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.organizeImports": "explicit"
    }
  }
}
```

## Dart/Flutter

### Configuration
See `analysis_options.yaml` in `apps/mobile/`.

### Key Rules
- Strict mode enabled
- All recommended lints
- Flutter-specific lints

### Editor Integration
Dart extension automatically uses `analysis_options.yaml`.

## Terraform

### Formatting
```bash
# Check format
terraform fmt -check -recursive

# Auto-format
terraform fmt -recursive
```

### Validation
```bash
terraform validate
```

## Pre-commit Hooks

Husky + lint-staged runs on every commit:

```json
// package.json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx,json,css,md}": [
      "biome check --write"
    ]
  }
}
```

For Python, add to `.pre-commit-config.yaml`:
```yaml
repos:
  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.8.0
    hooks:
      - id: ruff
        args: [--fix]
      - id: ruff-format
```

## CI Integration

GitHub Actions runs linting on every PR:

```yaml
- name: Lint JS/TS
  run: pnpm lint

- name: Lint Python
  run: |
    cd apps/api
    poe lint

- name: Lint Flutter
  run: |
    cd apps/mobile
    flutter analyze

- name: Check Terraform format
  run: |
    cd apps/infra
    terraform fmt -check -recursive
```

## Troubleshooting

### Biome Conflicts with Other Formatters
Disable other formatters in VS Code settings and set Biome as default.

### Ruff Import Sorting Issues
Ensure `I` rule set is enabled and run `ruff check --fix --select I`.

### Dart Analysis Takes Too Long
Run `flutter clean` then `flutter pub get` to regenerate analysis.
