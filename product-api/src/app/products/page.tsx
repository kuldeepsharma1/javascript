import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Pagination from "@/components/pagination";
import ProductCard from "@/components/product-card";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products | My Store",
  description: "Browse our product collection.",
};

type SearchParams = Promise<{
  page?: string;
  limit?: string;
}>;

const ALLOWED_LIMITS = [12, 24, 48] as const;

function parsePositiveInteger(
  value: string | undefined,
  fallback: number
) {
  if (!value || !/^[1-9]\d*$/.test(value)) {
    return fallback;
  }

  const parsed = Number(value);

  return Number.isSafeInteger(parsed) ? parsed : fallback;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  const page = parsePositiveInteger(params.page, 1);
  const requestedLimit = parsePositiveInteger(params.limit, 12);

  const limit = ALLOWED_LIMITS.includes(
    requestedLimit as (typeof ALLOWED_LIMITS)[number]
  )
    ? requestedLimit
    : 12;

  const data = await getProducts({ page, limit });
  const totalPages = Math.ceil(data.total / limit);

  if (page > Math.max(1, totalPages)) {
    notFound();
  }

  const startItem = data.total === 0 ? 0 : (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, data.total);

  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950">
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Editorial Storefront Header */}
        <header className="mb-10 flex flex-col justify-between gap-6 border-b border-zinc-200/80 pb-8 lg:flex-row lg:items-end dark:border-zinc-800">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white px-3 py-1 text-xs font-semibold tracking-wider text-zinc-700 uppercase shadow-2xs dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-white" />
              Catalog
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              Our Products
            </h1>

            <p className="text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
              Curated essentials crafted for everyday performance and timeless design.
            </p>
          </div>

          {/* Right Controls: Live Count + Server-Side Limit Switcher */}
          <div className="flex flex-wrap items-center gap-3 self-start lg:self-end">
            {/* Item Count Pill */}
            <div className="inline-flex h-10 items-center rounded-xl border border-zinc-200/80 bg-white px-3.5 text-xs font-medium text-zinc-500 tabular-nums shadow-2xs dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
              {data.total > 0 ? (
                <>
                  Showing{" "}
                  <span className="mx-1 font-semibold text-zinc-900 dark:text-zinc-100">
                    {startItem}–{endItem}
                  </span>{" "}
                  of{" "}
                  <span className="ml-1 font-semibold text-zinc-900 dark:text-zinc-100">
                    {data.total}
                  </span>
                </>
              ) : (
                "0 products"
              )}
            </div>

            {/* Per-Page Segmented Control */}
            <div
              role="group"
              aria-label="Items per page"
              className="inline-flex h-10 items-center gap-1 rounded-xl border border-zinc-200/80 bg-white p-1 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900"
            >
              <span className="px-2 text-xs font-medium text-zinc-400 select-none dark:text-zinc-500">
                Show
              </span>
              {ALLOWED_LIMITS.map((option) => {
                const isSelected = limit === option;
                return (
                  <Link
                    key={option}
                    href={`/products?page=1&limit=${option}`}
                    aria-current={isSelected ? "true" : undefined}
                    className={
                      isSelected
                        ? "inline-flex h-8 items-center justify-center rounded-lg bg-zinc-900 px-2.5 text-xs font-semibold text-white tabular-nums shadow-2xs transition-all dark:bg-white dark:text-zinc-950"
                        : "inline-flex h-8 items-center justify-center rounded-lg px-2.5 text-xs font-medium text-zinc-600 tabular-nums transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
                    }
                  >
                    {option}
                  </Link>
                );
              })}
            </div>
          </div>
        </header>

        {/* Product Grid or Empty State */}
        {data.products.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-300/80 bg-white/60 px-6 py-20 text-center dark:border-zinc-800 dark:bg-zinc-900/40">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-zinc-400 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500">
              <EmptyBoxIcon />
            </div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              No products found
            </h2>
            <p className="mt-1 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
              We couldn&apos;t find any items matching your current selection. Try resetting your view.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex h-10 items-center justify-center rounded-xl bg-zinc-900 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 active:scale-95 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Reset Catalog
            </Link>
          </div>
        ) : (
          <section
            aria-label="Product collection"
            className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {data.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          limit={limit}
          totalItems={data.total}
        />
      </main>
    </div>
  );
}

function EmptyBoxIcon() {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}