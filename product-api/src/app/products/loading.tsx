"use client";

import { useSearchParams } from "next/navigation";

const ALLOWED_LIMITS = [12, 24, 48] as const;

function getSkeletonCount(limitParam: string | null): number {
  if (!limitParam || !/^[1-9]\d*$/.test(limitParam)) {
    return 12;
  }
  const parsed = Number(limitParam);
  return ALLOWED_LIMITS.includes(parsed as (typeof ALLOWED_LIMITS)[number])
    ? parsed
    : 12;
}

export default function Loading() {
  const searchParams = useSearchParams();
  const count = getSkeletonCount(searchParams.get("limit"));

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading products"
      className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950"
    >
      <span className="sr-only">Loading products, please wait...</span>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <header className="mb-10 flex flex-col justify-between gap-6 border-b border-zinc-200/80 pb-8 lg:flex-row lg:items-end dark:border-zinc-800">
          <div className="max-w-2xl space-y-3">
            {/* Catalog Pill Skeleton */}
            <div className="h-6 w-24 animate-pulse rounded-full bg-zinc-200/80 dark:bg-zinc-800/80" />

            {/* Title Skeleton */}
            <div className="h-10 w-56 animate-pulse rounded-xl bg-zinc-200/90 sm:w-64 dark:bg-zinc-800" />

            {/* Subtitle Skeleton */}
            <div className="space-y-2 pt-1">
              <div className="h-4 w-80 max-w-full animate-pulse rounded-lg bg-zinc-200/70 dark:bg-zinc-800/70" />
            </div>
          </div>

          {/* Right Controls Skeleton */}
          <div className="flex flex-wrap items-center gap-3 self-start lg:self-end">
            <div className="h-10 w-36 animate-pulse rounded-xl border border-zinc-200/60 bg-white/80 dark:border-zinc-800/60 dark:bg-zinc-900/80" />
            <div className="h-10 w-44 animate-pulse rounded-xl border border-zinc-200/60 bg-white/80 dark:border-zinc-800/60 dark:bg-zinc-900/80" />
          </div>
        </header>

        {/* Product Card Grid Skeleton */}
        <section
          aria-hidden="true"
          className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {Array.from({ length: count }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-900"
            >
              {/* Top Image Stage Skeleton */}
              <div className="relative aspect-4/3 w-full animate-pulse bg-linear-to-b from-zinc-100 to-zinc-200/60 dark:from-zinc-800/70 dark:to-zinc-900">
                <div className="absolute top-3 left-3 h-6 w-20 rounded-full bg-zinc-200/90 dark:bg-zinc-700/70" />
                <div className="absolute top-3 right-3 h-6 w-12 rounded-full bg-zinc-200/90 dark:bg-zinc-700/70" />
              </div>

              {/* Card Body Skeleton */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div className="space-y-3">
                  {/* Rating & Stock Row */}
                  <div className="flex items-center justify-between">
                    <div className="h-3.5 w-12 animate-pulse rounded bg-zinc-200/80 dark:bg-zinc-800" />
                    <div className="h-3.5 w-16 animate-pulse rounded bg-zinc-200/80 dark:bg-zinc-800" />
                  </div>

                  {/* Title Lines */}
                  <div className="space-y-2 pt-0.5">
                    <div className="h-4 w-11/12 animate-pulse rounded-md bg-zinc-200/90 dark:bg-zinc-800" />
                    <div className="h-4 w-3/4 animate-pulse rounded-md bg-zinc-200/75 dark:bg-zinc-800/80" />
                  </div>

                  {/* Description Lines */}
                  <div className="space-y-1.5 pt-1">
                    <div className="h-3.5 w-full animate-pulse rounded bg-zinc-200/60 dark:bg-zinc-800/60" />
                    <div className="h-3.5 w-4/5 animate-pulse rounded bg-zinc-200/60 dark:bg-zinc-800/60" />
                  </div>
                </div>

                {/* Footer Skeleton */}
                <div className="mt-5 flex items-end justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800/80">
                  <div className="space-y-1.5">
                    <div className="h-3 w-12 animate-pulse rounded bg-zinc-200/60 dark:bg-zinc-800/60" />
                    <div className="h-6 w-20 animate-pulse rounded-md bg-zinc-200/90 dark:bg-zinc-800" />
                  </div>
                  <div className="h-9 w-9 animate-pulse rounded-xl bg-zinc-200/80 dark:bg-zinc-800" />
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Bottom Pagination Skeleton */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-200/80 pt-6 sm:flex-row dark:border-zinc-800">
          <div className="h-4 w-44 animate-pulse rounded bg-zinc-200/70 dark:bg-zinc-800/70" />
          <div className="h-12 w-72 animate-pulse rounded-2xl border border-zinc-200/70 bg-white/80 dark:border-zinc-800 dark:bg-zinc-900/80" />
        </div>
      </main>
    </div>
  );
}