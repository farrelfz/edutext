# EduText

EduText is a Next.js 14 application that generates Indonesian education documents (Modul Ajar, RPP, Modul Pembelajaran) with Deep Learning 4 phases and 3M (Mindful, Meaningful, Joyful) embedded in every phase. PDF generation is handled by Playwright in a background worker.

## Stack
- Next.js 14 App Router + TypeScript
- TailwindCSS (shadcn-inspired components)
- Prisma + PostgreSQL
- NextAuth (Google OAuth, httpOnly cookies)
- BullMQ + Redis for jobs
- Playwright PDF generator
- Midtrans Snap payments
- S3-compatible storage (Cloudflare R2)

## Local setup
1. Copy `.env.example` to `.env` and fill values.
2. Start Postgres + Redis:
   ```bash
   docker compose up -d
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Run migrations + seed:
   ```bash
   pnpm prisma:migrate
   pnpm prisma:seed
   ```
5. Install Playwright deps:
   ```bash
   npx playwright install --with-deps chromium
   ```
6. Start app + worker:
   ```bash
   pnpm dev
   pnpm worker
   ```

## Environment variables
See `.env.example` for the full list.

## Deployment
See [docs/deployment.md](docs/deployment.md).
