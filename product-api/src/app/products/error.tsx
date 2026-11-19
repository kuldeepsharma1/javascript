
"use client";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ProductsError({
  reset,
}: ErrorProps) {
  return (
    <main className="mx-auto max-w-xl px-4 py-24 text-center">
      <h2 className="text-2xl font-bold">
        Something went wrong
      </h2>

      <p className="mt-3 text-gray-600">
        We couldn&apos;t load the products. Please try again.
      </p>

      <button
        onClick={reset}
        className="mt-6 rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800"
      >
        Try again
      </button>
    </main>
  );
}
