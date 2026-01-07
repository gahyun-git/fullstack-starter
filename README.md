# Fullstack Starter

[English](./README.en.md) | 한국어

프로덕션 레디 풀스택 모노레포 템플릿. Next.js 16, FastAPI, Flutter, GCP 인프라를 포함합니다.

## 주요 기능

- **모던 스택**: Next.js 16 + React 19, FastAPI, Flutter 3.32, TailwindCSS v4
- **타입 안전성**: TypeScript, Pydantic, Dart 전체 타입 지원
- **인증**: better-auth 기반 OAuth (Google, GitHub, Kakao)
- **국제화**: next-intl (웹), Flutter ARB (모바일)
- **API 클라이언트 자동 생성**: Orval (웹), swagger_parser (모바일)
- **인프라 as 코드**: Terraform + GCP (Cloud Run, Cloud SQL, Cloud Storage)
- **CI/CD**: GitHub Actions + Workload Identity Federation (키리스 배포)
- **AI 에이전트 지원**: Gemini, Claude 등 AI 코딩 에이전트용 가이드 포함

## 기술 스택

| 레이어 | 기술 |
|--------|------|
| **프론트엔드** | Next.js 16, React 19, TailwindCSS v4, shadcn/ui, TanStack Query, Jotai |
| **백엔드** | FastAPI, SQLAlchemy (async), PostgreSQL 16, Redis 7 |
| **모바일** | Flutter 3.32, Riverpod 3, go_router 17 |
| **워커** | FastAPI + CloudTasks/PubSub |
| **인프라** | Terraform, GCP (Cloud Run, Cloud SQL, Cloud Storage, CDN) |
| **CI/CD** | GitHub Actions, Workload Identity Federation |

## 사전 요구사항

- [mise](https://mise.jdx.dev/) - 런타임 버전 관리자
- [Docker](https://www.docker.com/) - 로컬 인프라 실행
- [Terraform](https://www.terraform.io/) - 클라우드 인프라 (선택)

## 빠른 시작

### 1. 런타임 설치

```bash
# mise 설치 (처음인 경우)
curl https://mise.run | sh

# 모든 런타임 설치 (Node 24, Python 3.13, Flutter 3.32, pnpm 10, uv)
mise install
```

### 2. 의존성 설치

```bash
# 루트 의존성 (JS/TS)
pnpm install

# API 의존성
cd apps/api && uv sync --frozen

# Worker 의존성
cd apps/worker && uv sync --frozen

# Mobile 의존성
cd apps/mobile && flutter pub get
```

### 3. 로컬 인프라 시작

```bash
mise run infra:up
```

시작되는 서비스:
- PostgreSQL (5432)
- Redis (6379)
- MinIO (9000, 9001)

### 4. 데이터베이스 마이그레이션

```bash
mise run migrate
```

### 5. 개발 서버 시작

```bash
# 모든 서비스 동시 시작 (권장)
mise run dev

# 또는 개별 시작
mise run dev:api    # API 서버
mise run dev:web    # Web 서버
mise run dev:worker # Worker
```

## 프로젝트 구조

```
fullstack-starter/
├── apps/
│   ├── api/           # FastAPI 백엔드
│   ├── web/           # Next.js 프론트엔드
│   ├── worker/        # 백그라운드 워커
│   ├── mobile/        # Flutter 모바일 앱
│   └── infra/         # Terraform 인프라
├── packages/          # 공유 패키지
├── .agent/rules/      # AI 에이전트 가이드라인
├── .serena/           # Serena MCP 설정
└── .github/workflows/ # CI/CD
```

## 주요 명령어

### mise 태스크 (권장)

| 명령어 | 설명 |
|--------|------|
| `mise run dev` | 모든 서비스 시작 |
| `mise run lint` | 모든 앱 린트 |
| `mise run format` | 모든 앱 포맷 |
| `mise run test` | 모든 앱 테스트 |
| `mise run typecheck` | 타입 체크 |
| `mise run infra:up` | 로컬 인프라 시작 |
| `mise run infra:down` | 로컬 인프라 중지 |
| `mise run migrate` | DB 마이그레이션 |
| `mise run gen:api` | API 클라이언트 생성 |

### 앱별 명령어

<details>
<summary>API (apps/api)</summary>

| 명령어 | 설명 |
|--------|------|
| `poe dev` | 개발 서버 시작 |
| `poe test` | 테스트 실행 |
| `poe lint` | 린터 실행 |
| `poe format` | 코드 포맷 |
| `poe migrate` | 마이그레이션 실행 |
| `poe migrate-create "desc"` | 새 마이그레이션 생성 |

</details>

<details>
<summary>Web (apps/web)</summary>

| 명령어 | 설명 |
|--------|------|
| `pnpm dev` | 개발 서버 시작 |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm start` | 프로덕션 서버 시작 |
| `pnpm test` | 테스트 실행 |
| `pnpm lint` | 린터 실행 |
| `pnpm gen:api` | OpenAPI에서 API 클라이언트 생성 |

</details>

<details>
<summary>Mobile (apps/mobile)</summary>

| 명령어 | 설명 |
|--------|------|
| `flutter run` | 디바이스/시뮬레이터에서 실행 |
| `flutter test` | 테스트 실행 |
| `flutter analyze` | 분석기 실행 |
| `flutter build apk` | Android APK 빌드 |
| `flutter build ios` | iOS 빌드 |

</details>

<details>
<summary>Infrastructure (apps/infra)</summary>

| 명령어 | 설명 |
|--------|------|
| `pnpm plan` | Terraform 변경사항 미리보기 |
| `pnpm apply` | Terraform 변경사항 적용 |

</details>

## 환경 설정

### 환경 변수

예제 파일을 복사하고 설정하세요:

```bash
# API
cp apps/api/.env.example apps/api/.env

# Web
cp apps/web/.env.example apps/web/.env

# Infra
cp apps/infra/terraform.tfvars.example apps/infra/terraform.tfvars
```

### GitHub Actions 시크릿

리포지토리에 다음 시크릿을 설정하세요:

| 시크릿 | 설명 |
|--------|------|
| `GCP_PROJECT_ID` | GCP 프로젝트 ID |
| `GCP_REGION` | GCP 리전 (예: `asia-northeast3`) |
| `WORKLOAD_IDENTITY_PROVIDER` | Terraform output에서 확인 |
| `GCP_SERVICE_ACCOUNT` | Terraform output에서 확인 |

## 배포

### GitHub Actions (권장)

`main` 브랜치에 푸시하면 자동 배포:
- `apps/api/` 변경 → API 배포
- `apps/web/` 변경 → Web 배포
- `apps/worker/` 변경 → Worker 배포

### 수동 배포

```bash
# Docker 이미지 빌드 및 푸시
cd apps/api
docker build -t gcr.io/PROJECT_ID/api .
docker push gcr.io/PROJECT_ID/api

# Cloud Run 배포
gcloud run deploy api --image gcr.io/PROJECT_ID/api --region REGION
```

## AI 에이전트 지원

이 템플릿은 AI 코딩 에이전트(Gemini, Claude 등)와 함께 사용하도록 설계되었습니다.

- `.agent/rules/` - AI 에이전트용 가이드라인
- `.serena/` - Serena MCP 설정

## 문서

- [빌드 가이드](.agent/rules/build-guide.md)
- [린트 & 포맷 가이드](.agent/rules/lint-format-guide.md)
- [테스트 가이드](.agent/rules/test-guide.md)

## 라이선스

MIT

## 스폰서

이 프로젝트가 도움이 되셨다면 커피 한 잔 사주세요!

<a href="https://www.buymeacoffee.com/firstfluke" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
