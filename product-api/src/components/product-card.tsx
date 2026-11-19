
import Image from "next/image";
import type { Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
};

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[4/3] bg-gray-50">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain p-4"
        />
      </div>

      <div className="space-y-3 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
          {product.category}
        </p>

        <h2 className="line-clamp-2 font-semibold text-gray-900">
          {product.title}
        </h2>

        <p className="line-clamp-2 text-sm text-gray-600">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            {priceFormatter.format(product.price)}
          </span>

          <span className="text-sm text-yellow-600">
            ★ {product.rating.toFixed(1)}
          </span>
        </div>

        <p className="text-xs text-gray-500">
          {product.stock > 0
            ? `${product.stock} in stock`
            : "Out of stock"}
        </p>
      </div>
    </article>
  );
}
