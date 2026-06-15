# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development (runs on port 5175 with Turbopack)
npm run dev

# Build for production
npm run build

# Lint
npm run lint
npm run lint:fix

# Format
npm run prettier

# Database
npx prisma migrate dev        # run migrations
npx prisma migrate deploy     # deploy migrations (production)
npx prisma db seed            # seed the database
npx prisma studio             # open Prisma Studio

# Background services (must run alongside dev server)
npm run start:queue-worker    # BullMQ worker for processing task jobs
npm run start:cron            # Cron script that polls /api/cron every 5s
```

## Environment Variables

Copy `env.example` to `.env.local` and fill in:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `AUTH_SECRET` | NextAuth secret |
| `AUTH_URL` | App base URL |
| `REDIS_HOST`, `REDIS_PORT`, `REDIS_URL` | Redis for BullMQ |
| `CRON_JOB_SECRET` | Bearer token that authenticates calls to `/api/cron` |
| `MAIL_HOST/USERNAME/PASSWORD/PORT/SECURE/FROM_ADDRESS` | Nodemailer SMTP |
| `FIREBASE_PROJECT_ID/CLIENT_EMAIL/PRIVATE_KEY` | Firebase Admin SDK for FCM push notifications |
| `NEXT_PUBLIC_APP_NAME` | Client-visible app name |
| `API_BASE_URL` | Used by cron script to call the Next.js server |

## Architecture

### Route Groups

- `src/app/(auth)/` — unauthenticated pages: login, register, forgot-password, reset-password, email-verification
- `src/app/(application)/` — authenticated app pages: dashboard, task, analytics, settings, profile
- `src/app/api/` — REST API routes (used by client components that can't call Server Actions)

### Parallel Routes (Next.js `@slot`)

Dashboard and analytics use Next.js parallel routes extensively. Each `@slot` directory renders independently with its own loading/error states:
- `dashboard/@topSection`, `@midSection`, `@task` (with nested routes for active/completed/overdue)
- `analytics/@topSection`, `@midSection`, `@bottomSection`

### Data Flow

```
Client Component → Server Action (src/server-actions/) → Service (src/services/) → Prisma
Client Component → REST API Route (src/app/api/v1/) → Service → Prisma
```

Server Actions use the `'use server'` + `'server-only'` pair and return typed `FormState` objects. Services are pure DB functions — they import `'server-only'` and must never be called from client components directly.

### Notification Pipeline

When a task is created/updated, a BullMQ job is queued via `processTaskQueue` (`src/lib/queue/bullmq-queue.ts`). The worker (`src/lib/queue/queue-worker.ts`) processes this and writes a row to the `Jobs` table with a `scheduledTime`. The cron script (`scripts/cron-script.ts`) calls `GET /api/cron` every 5 seconds; that route reads pending `Jobs` rows and dispatches FCM push notifications (Firebase Admin) and/or email notifications (Nodemailer) as configured per user. The `Jobs` table tracks retry logic (max 3 retries via `appConfig.MAX_JOB_RETRY_COUNT`).

### Authentication

NextAuth v5 (`src/auth.ts`) with JWT strategy and Prisma adapter. Two credential providers: `credentialsSignUp` (registration) and default credentials (login). Session extends the JWT with `id` and `fcmToken`. Middleware (`src/middleware.ts`) guards all non-API routes by checking the `authjs.session-token` cookie.

### Context Providers

All wrapped in `(application)/layout.tsx`:
- `UserSettingProvider` — user's settings (theme, timezone, notifications)
- `CategoryContextProvider` — user's task categories
- `DateTimeSettingProvider` — resolved timezone + date format
- `SidebarContextProvider` — sidebar open/close state
- `TaskContextProvider` — filter, sort, pagination state for the task list

### Config

- `src/config/app.config.ts` — app-level constants (retry counts, default timezone `Asia/Kolkata`, computation periods)
- `src/config/server.config.ts` — server-only env vars (Redis, mail, Firebase). Marked `server-only`, never import in client code.
- `src/config/client.config.ts` — client-safe env vars

### Path Aliases

`@/` resolves to `src/`. All imports use this alias.

## Key Conventions

- **Validation**: Zod schemas live in `src/validationsSchemas/`. Server Actions validate with `schema.safeParse()` before touching the DB.
- **Enums**: Prisma enums (`TaskStatus`, `TaskPriority`) are used throughout. App-level enums (`TaskListTypes`, `DirectionIndicators`, `EMAIL_NOTIFICATION_TEMPLATE`) live in `src/lib/enums.ts`.
- **UI components**: shadcn/ui components are in `src/components/ui/`. Custom shared components are in `src/components/common/`. Page-scoped UI components go in a `_ui/` folder next to the page, or `_partials/` for layout-level partials.
- **Pre-commit hooks**: Husky + lint-staged runs ESLint and Prettier on staged files. Don't skip with `--no-verify`.
