
export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 h-9 w-48 animate-pulse rounded bg-gray-200" />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl border p-4"
          >
            <div className="aspect-4/3 animate-pulse rounded bg-gray-200" />
            <div className="mt-4 h-5 animate-pulse rounded bg-gray-200" />
            <div className="mt-3 h-4 w-2/3 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </main>
  );
}
