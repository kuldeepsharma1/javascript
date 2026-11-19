import Link from "next/link";
import ProductCard from "@/components/product-card";
import { getProducts } from "@/lib/products";

export default async function Home() {
  let featuredProducts: Awaited<ReturnType<typeof getProducts>>["products"] = [];

  try {
    const data = await getProducts({ page: 1, limit: 4 });
    featuredProducts = data.products.slice(0, 4);
  } catch {
    featuredProducts = [];
  }

  return (
    <div className="relative overflow-hidden bg-zinc-50/50 dark:bg-zinc-950">
      {/* Subtle Top Ambient Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[28rem] w-[56rem] -translate-x-1/2 rounded-full bg-zinc-900/[0.04] blur-3xl dark:bg-white/[0.04]"
      />

      <main className="relative mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24 lg:px-8">
        {/* Hero Section */}
        <section className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200/90 bg-white/90 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-zinc-700 uppercase shadow-2xs backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            New Collection Available
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl dark:text-white">
            Everyday objects,{" "}
            <span className="text-zinc-500 dark:text-zinc-400">
              refined to the detail.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
            Explore thoughtfully selected products designed for daily reliability,
            clean aesthetics, and effortless performance.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/products"
              className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-7 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-zinc-800 active:scale-95 sm:w-auto dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              <span>Browse Catalog</span>
              <ArrowRightIcon />
            </Link>

            <Link
              href="/products?limit=24"
              className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-zinc-200/90 bg-white/90 px-6 text-sm font-medium text-zinc-700 shadow-2xs backdrop-blur-md transition-all duration-200 hover:bg-zinc-100 hover:text-zinc-950 active:scale-95 sm:w-auto dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              View Full Grid
            </Link>
          </div>
        </section>

        {/* Value Highlights Strip */}
        <section
          aria-label="Store highlights"
          className="mt-16 grid grid-cols-1 gap-5 sm:mt-20 md:grid-cols-3"
        >
          <div className="rounded-2xl border border-zinc-200/80 bg-white/80 p-6 shadow-2xs backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/70">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200/80 bg-zinc-50 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-800 dark:text-white">
              <SparklesIcon />
            </div>
            <h2 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-white">
              Curated Selection
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Every item is vetted for build quality, utility, and lasting appeal.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200/80 bg-white/80 p-6 shadow-2xs backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/70">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200/80 bg-zinc-50 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-800 dark:text-white">
              <ZapIcon />
            </div>
            <h2 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-white">
              Instant Catalog Speed
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Server-rendered pagination and skeleton states keep browsing snappy.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200/80 bg-white/80 p-6 shadow-2xs backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/70">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200/80 bg-zinc-50 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-800 dark:text-white">
              <ShieldCheckIcon />
            </div>
            <h2 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-white">
              Live Stock Transparency
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Real-time availability, low-stock alerts, and clear pricing at a glance.
            </p>
          </div>
        </section>

        {/* Featured Products Preview */}
        {featuredProducts.length > 0 && (
          <section aria-label="Featured products" className="mt-20">
            <div className="mb-8 flex flex-col justify-between gap-4 border-b border-zinc-200/80 pb-5 sm:flex-row sm:items-end dark:border-zinc-800">
              <div>
                <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                  Featured
                </p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  Trending Right Now
                </h2>
              </div>

              <Link
                href="/products"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-700 transition-colors hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
              >
                <span>See all products</span>
                <ArrowRightIcon />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4.167 10h11.666" />
      <path d="M10.833 5 15.833 10l-5 5" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.85}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.85}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.85}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}