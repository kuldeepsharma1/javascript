
import Pagination from "@/components/pagination";
import ProductCard from "@/components/product-card";
import { getProducts } from "@/lib/products";
import type { Metadata } from "next";
import { notFound } from "next/navigation";



export const metadata: Metadata = {
  title: "Products | My Store",
  description: "Browse our product collection.",
};

type SearchParams = Promise<{
  page?: string;
  limit?: string;
}>;

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

  // Restrict page size to supported options.
  const requestedLimit = parsePositiveInteger(
    params.limit,
    12
  );

  const limit = [12, 24, 48].includes(requestedLimit)
    ? requestedLimit
    : 12;

  const data = await getProducts({ page, limit });

  const totalPages = Math.ceil(data.total / limit);

  // Avoid silently showing an empty page for invalid page numbers.
  if (page > Math.max(1, totalPages)) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Our Products
        </h1>

        <p className="mt-2 text-gray-600">
          Discover our latest collection.
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Showing {data.products.length} of {data.total} products
        </p>
      </div>

      {data.products.length === 0 ? (
        <p className="py-16 text-center">
          No products found.
        </p>
      ) : (
        <section
          aria-label="Product collection"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {data.products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </section>
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        limit={limit}
      />

    </main>
  );
}
