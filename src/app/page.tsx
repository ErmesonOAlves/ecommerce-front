import { db } from "@/db";
import { products } from "@/db/schema";
import { ProductCard } from "@/components/product-card";

export const dynamic = "force-dynamic";

export default async function Home() {
  const allProducts = await db.select().from(products);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Adidas Store
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {allProducts.length} products available
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Featured Products
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Explore our collection of Adidas sneakers and apparel
          </p>
        </div>

        {allProducts.length === 0 ? (
          <div className="rounded-lg border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
            <p className="text-zinc-500 dark:text-zinc-400">
              No products found. Run the seed script to populate the database.
            </p>
            <code className="mt-2 block text-sm text-zinc-400 dark:text-zinc-500">
              npx tsx scripts/seed.ts
            </code>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-zinc-500 sm:px-6 lg:px-8 dark:text-zinc-400">
          Built with Next.js, Drizzle ORM, Neon PostgreSQL, Better Auth &amp;
          Zustand
        </div>
      </footer>
    </div>
  );
}
