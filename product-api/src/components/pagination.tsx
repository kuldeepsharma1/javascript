import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalItems?: number; // Optional: shows "Showing X–Y of Z"
};

export default function Pagination({
  currentPage,
  totalPages,
  limit,
  totalItems,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageUrl = (page: number) =>
    `/products?page=${page}&limit=${limit}`;

  // Build smart page array with ellipsis markers (e.g., [1, '...', 4, 5, 6, '...', 20])
  const getVisiblePages = (): (number | "ellipsis")[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, "ellipsis", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        "ellipsis",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "ellipsis",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "ellipsis",
      totalPages,
    ];
  };

  const pages = getVisiblePages();
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  // Optional item range calculation
  const startItem = (currentPage - 1) * limit + 1;
  const endItem = totalItems
    ? Math.min(currentPage * limit, totalItems)
    : currentPage * limit;

  return (
    <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-200/80 pt-6 sm:flex-row dark:border-zinc-800">
      {/* Left: Results Summary */}
      <p className="text-sm text-zinc-500 tabular-nums dark:text-zinc-400">
        {totalItems ? (
          <>
            Showing{" "}
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              {startItem}
            </span>
            –
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              {endItem}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              {totalItems}
            </span>{" "}
            products
          </>
        ) : (
          <>
            Page{" "}
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              {currentPage}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              {totalPages}
            </span>
          </>
        )}
      </p>

      {/* Right: Floating Pill Pagination Bar */}
      <nav
        aria-label="Pagination"
        className="inline-flex items-center gap-1 rounded-2xl border border-zinc-200/90 bg-white/80 p-1.5 shadow-sm backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80"
      >
        {/* Previous Button */}
        {isFirstPage ? (
          <span
            aria-disabled="true"
            className="inline-flex h-9 cursor-not-allowed items-center gap-1.5 rounded-xl px-3 text-sm font-medium text-zinc-300 select-none dark:text-zinc-600"
          >
            <ChevronLeftIcon />
            <span className="hidden sm:inline">Prev</span>
          </span>
        ) : (
          <Link
            href={getPageUrl(currentPage - 1)}
            rel="prev"
            className="inline-flex h-9 items-center gap-1.5 rounded-xl px-3 text-sm font-medium text-zinc-700 transition-all duration-200 hover:bg-zinc-100 hover:text-zinc-950 active:scale-95 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            <ChevronLeftIcon />
            <span className="hidden sm:inline">Prev</span>
          </Link>
        )}

        {/* Mobile Compact Indicator */}
        <span className="px-3 text-xs font-medium text-zinc-600 tabular-nums sm:hidden dark:text-zinc-300">
          {currentPage} / {totalPages}
        </span>

        {/* Desktop Page Numbers */}
        <div className="hidden items-center gap-1 sm:flex">
          {pages.map((item, idx) => {
            if (item === "ellipsis") {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="flex h-9 w-9 items-center justify-center text-sm text-zinc-400 select-none dark:text-zinc-500"
                >
                  …
                </span>
              );
            }

            const isActive = item === currentPage;

            return (
              <Link
                key={item}
                href={getPageUrl(item)}
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "flex h-9 min-w-[2.25rem] items-center justify-center rounded-xl bg-zinc-900 px-3 text-sm font-semibold text-white shadow-sm ring-1 ring-zinc-900/10 transition-all duration-200 dark:bg-white dark:text-zinc-950 dark:ring-white/20"
                    : "flex h-9 min-w-[2.25rem] items-center justify-center rounded-xl px-3 text-sm font-medium text-zinc-600 tabular-nums transition-all duration-200 hover:bg-zinc-100 hover:text-zinc-950 active:scale-95 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
                }
              >
                {item}
              </Link>
            );
          })}
        </div>

        {/* Next Button */}
        {isLastPage ? (
          <span
            aria-disabled="true"
            className="inline-flex h-9 cursor-not-allowed items-center gap-1.5 rounded-xl px-3 text-sm font-medium text-zinc-300 select-none dark:text-zinc-600"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRightIcon />
          </span>
        ) : (
          <Link
            href={getPageUrl(currentPage + 1)}
            rel="next"
            className="inline-flex h-9 items-center gap-1.5 rounded-xl px-3 text-sm font-medium text-zinc-700 transition-all duration-200 hover:bg-zinc-100 hover:text-zinc-950 active:scale-95 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRightIcon />
          </Link>
        )}
      </nav>
    </div>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12.5 15l-5-5 5-5" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7.5 15l5-5-5-5" />
    </svg>
  );
}