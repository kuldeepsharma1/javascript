"use client";

import Link from "next/link";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ProductsError({ error, reset }: ErrorProps) {
  return (
    <div className="flex min-h-[75vh] items-center justify-center bg-zinc-50/50 px-4 py-16 sm:px-6 dark:bg-zinc-950">
      <main
        role="alert"
        aria-live="assertive"
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/90 p-8 text-center shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:p-10 dark:border-zinc-800 dark:bg-zinc-900/90 dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6)]"
      >
        {/* Subtle Top Rose Ambient Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-40 w-72 -translate-x-1/2 rounded-full bg-rose-500/10 blur-3xl dark:bg-rose-500/15"
        />

        {/* Icon Badge */}
        <div className="relative mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-200/80 bg-rose-50 text-rose-600 shadow-2xs dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-400">
          <AlertTriangleIcon />
        </div>

        {/* Status Pill */}
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-rose-200/70 bg-rose-50/70 px-3 py-1 text-[11px] font-semibold tracking-wider text-rose-700 uppercase dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
          Catalog Unavailable
        </div>

        {/* Heading & Copy */}
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Something went wrong
        </h2>

        <p className="mt-2.5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          We couldn&apos;t load the product catalog right now. This is usually temporary—please try refreshing the request.
        </p>

        {/* Optional Next.js Error Digest */}
        {error?.digest && (
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-zinc-200/80 bg-zinc-50 px-2.5 py-1 font-mono text-[11px] text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
            <span>Error ID:</span>
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">
              {error.digest}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={reset}
            className="group inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-zinc-800 active:scale-95 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            <RefreshIcon />
            <span>Try again</span>
          </button>

          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-200/90 bg-white px-5 text-sm font-medium text-zinc-700 transition-all duration-200 hover:bg-zinc-50 hover:text-zinc-950 active:scale-95 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}

function AlertTriangleIcon() {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.85}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg
      className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  );
}