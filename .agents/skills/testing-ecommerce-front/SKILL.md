# Testing ecommerce-front

## Devin Secrets Needed
- `DATABASE_URL` - Neon PostgreSQL connection string (raw URL format, not wrapped in `psql '...'`)

## Environment Setup

1. Ensure `.env.local` exists in the project root with:
   ```
   DATABASE_URL=<neon-connection-string>
   BETTER_AUTH_SECRET=<secret>
   BETTER_AUTH_URL=http://localhost:3000
   ```

2. The DATABASE_URL secret may come in `psql '...'` format. Strip the prefix/suffix to get the raw URL:
   ```bash
   export DATABASE_URL=$(echo "$DATABASE_URL" | sed "s/^psql '//;s/'$//")
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Database Seeding

The seed script uses raw SQL (tagged template literals) via `@neondatabase/serverless` to create the products table and insert sample data.

```bash
export DATABASE_URL=$(echo "$DATABASE_URL" | sed "s/^psql '//;s/'$//")
npx tsx scripts/seed.ts
```

Note: The seed script is destructive - it runs `DELETE FROM products` before inserting.

## Running the Dev Server

```bash
export DATABASE_URL=$(echo "$DATABASE_URL" | sed "s/^psql '//;s/'$//")
npm run dev
```

The app runs on `http://localhost:3000`.

**Important**: Before starting the dev server:
- Kill any existing processes on port 3000: `fuser -k 3000/tcp`
- Remove stale lock files: `rm -rf .next/dev/lock`
- The DATABASE_URL env var must be set in the same shell session (not just in .env.local) when running seed scripts

## What to Test

1. **Homepage product grid**: Navigate to `http://localhost:3000` and verify all 10 Adidas product cards render with name, category, price, stock, image, and description
2. **Add to Cart button**: Click "Add to Cart" on any product - should not produce console errors (Zustand store updates in memory)
3. **Header**: Shows "Adidas Store" and "10 products available"
4. **Footer**: Shows tech stack attribution

## Known Issues

- Some Unsplash product images may 404 if the photo is removed or URL changes. This shows as a broken image placeholder in the card.
- The `@neondatabase/serverless` `neon()` function must be called as tagged template literals (`` sql`...` ``), not regular function calls (`` sql(`...`) ``)

## Lint

```bash
npm run lint
```

## Available Scripts

- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm run lint` - ESLint
- `npm run db:seed` - Seed database (requires DATABASE_URL in env)
- `npm run db:push` - Push schema to database
- `npm run db:generate` - Generate Drizzle migrations
- `npm run db:studio` - Open Drizzle Studio
