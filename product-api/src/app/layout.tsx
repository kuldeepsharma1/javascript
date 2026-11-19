import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "My Store — Curated Everyday Essentials",
    template: "%s | My Store",
  },
  description:
    "Curated essentials crafted for everyday performance and timeless design.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-zinc-50 font-sans text-zinc-900 selection:bg-zinc-900 selection:text-white dark:bg-zinc-950 dark:text-zinc-100 dark:selection:bg-white dark:selection:text-zinc-950">
        {/* Sticky Glassmorphic Navbar */}
        <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/75 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/75">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Brand Logo */}
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 text-sm font-bold tracking-tight text-zinc-900 dark:text-white"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-900 text-white shadow-xs transition-transform duration-200 group-hover:scale-105 dark:bg-white dark:text-zinc-950">
                <BrandMarkIcon />
              </span>
              <span className="text-base font-semibold tracking-tight">
                My Store
              </span>
            </Link>

            {/* Primary Navigation */}
            <nav aria-label="Main navigation" className="flex items-center gap-1 sm:gap-2">
              <Link
                href="/"
                className="rounded-xl px-3.5 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow-2xs transition-all hover:bg-zinc-800 active:scale-95 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                Catalog
              </Link>
            </nav>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1">{children}</div>

        {/* Minimal Storefront Footer */}
        <footer className="border-t border-zinc-200/80 bg-white/60 py-8 dark:border-zinc-800/80 dark:bg-zinc-950">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-xs text-zinc-500 sm:flex-row sm:px-6 lg:px-8 dark:text-zinc-400">
            <p className="font-medium text-zinc-600 dark:text-zinc-400">
            © 2026 My Store. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/products"
                className="transition-colors hover:text-zinc-900 dark:hover:text-white"
              >
                Products
              </Link>
              <Link
                href="/"
                className="transition-colors hover:text-zinc-900 dark:hover:text-white"
              >
                Overview
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

function BrandMarkIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}