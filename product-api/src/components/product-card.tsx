import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
};

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function ProductCard({ product }: ProductCardProps) {
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  // Optional support if your Product model includes discountPercentage
  const discount =
    "discountPercentage" in product &&
    typeof product.discountPercentage === "number" &&
    product.discountPercentage >= 5
      ? Math.round(product.discountPercentage)
      : null;

  const originalPrice = discount
    ? product.price / (1 - discount / 100)
    : null;

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-900 ${
        isOutOfStock
          ? "opacity-75"
          : "hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] dark:hover:border-zinc-700 dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
      }`}
    >
      {/* Full-card clickable overlay link */}
      <Link
        href={`/products/${product.id}`}
        aria-label={`View ${product.title}`}
        className="absolute inset-0 z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-white"
      />

      {/* Top Image Stage */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-b from-zinc-100/80 to-zinc-100/40 dark:from-zinc-800/60 dark:to-zinc-900">
        {/* Top-Left Category Glass Pill */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5">
          <span className="rounded-full border border-white/60 bg-white/80 px-2.5 py-1 text-[11px] font-semibold tracking-wider text-zinc-700 uppercase shadow-xs backdrop-blur-md dark:border-zinc-700/80 dark:bg-zinc-900/80 dark:text-zinc-300">
            {product.category}
          </span>
        </div>

        {/* Top-Right Status / Discount Pill */}
        <div className="absolute top-3 right-3 z-20 flex flex-col items-end gap-1.5">
          {isOutOfStock ? (
            <span className="rounded-full bg-zinc-900/90 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md dark:bg-zinc-100 dark:text-zinc-900">
              Sold Out
            </span>
          ) : discount ? (
            <span className="rounded-full bg-emerald-600 px-2.5 py-1 text-[11px] font-semibold text-white shadow-xs">
              -{discount}%
            </span>
          ) : null}
        </div>

        {/* Product Image */}
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-contain p-6 transition-transform duration-500 ease-out ${
            isOutOfStock ? "grayscale" : "group-hover:scale-105"
          }`}
        />
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div className="space-y-2">
          {/* Rating & Stock Status Row */}
          <div className="flex items-center justify-between gap-2 text-xs">
            <div className="inline-flex items-center gap-1 font-medium text-zinc-700 tabular-nums dark:text-zinc-300">
              <StarIcon />
              <span>{product.rating.toFixed(1)}</span>
            </div>

            {isOutOfStock ? (
              <span className="font-medium text-zinc-400 dark:text-zinc-500">
                Unavailable
              </span>
            ) : isLowStock ? (
              <span className="inline-flex items-center gap-1.5 font-medium text-amber-600 dark:text-amber-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
                Only {product.stock} left
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                In stock
              </span>
            )}
          </div>

          {/* Title (min-height keeps multi-column grid rows aligned) */}
          <h2 className="line-clamp-2 min-h-[2.75rem] text-base leading-snug font-semibold tracking-tight text-zinc-900 transition-colors group-hover:text-zinc-700 dark:text-zinc-100 dark:group-hover:text-white">
            {product.title}
          </h2>

          {/* Description */}
          <p className="line-clamp-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            {product.description}
          </p>
        </div>

        {/* Footer: Price & Action Indicator */}
        <div className="mt-5 flex items-end justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800/80">
          <div className="flex flex-col">
            {originalPrice && (
              <span className="text-xs text-zinc-400 line-through tabular-nums dark:text-zinc-500">
                {priceFormatter.format(originalPrice)}
              </span>
            )}
            <span className="text-xl font-bold tracking-tight text-zinc-900 tabular-nums dark:text-white">
              {priceFormatter.format(product.price)}
            </span>
          </div>

          <span
            aria-hidden="true"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200/80 bg-zinc-50 text-zinc-700 transition-all duration-200 group-hover:border-zinc-900 group-hover:bg-zinc-900 group-hover:text-white dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-300 dark:group-hover:border-white dark:group-hover:bg-white dark:group-hover:text-zinc-950"
          >
            <ArrowUpRightIcon />
          </span>
        </div>
      </div>
    </article>
  );
}

function StarIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg
      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 14L14 6M7 6h7v7" />
    </svg>
  );
}