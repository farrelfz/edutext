# Deployment

## Local development
1. Start Postgres + Redis via Docker:
   ```bash
   docker compose up -d
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Run Prisma migrations + seed:
   ```bash
   pnpm prisma:migrate
   pnpm prisma:seed
   ```
4. Install Playwright deps:
   ```bash
   npx playwright install --with-deps chromium
   ```
5. Run Next.js + worker:
   ```bash
   pnpm dev
   pnpm worker
   ```

## Vercel
- Configure env vars (DATABASE_URL, NEXTAUTH_URL, NEXTAUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, MIDTRANS keys, REDIS_URL, R2 creds).
- Deploy Next.js app to Vercel.
- Run the worker on a VPS or separate container (Playwright is heavy).

## Niagahoster VPS (worker)
1. Install Node.js 20, pnpm, nginx, certbot.
2. Install Playwright deps:
   ```bash
   sudo apt-get update
   sudo apt-get install -y libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgbm1 libasound2
   npx playwright install --with-deps chromium
   ```
3. Run app & worker with PM2:
   ```bash
   pm2 start "pnpm start" --name edutext-web
   pm2 start "pnpm worker" --name edutext-worker
   ```
4. Reverse proxy with nginx + SSL.

## Worker considerations
- Run worker with REDIS_URL set.
- Use `--no-sandbox --disable-setuid-sandbox` flags (already configured).
