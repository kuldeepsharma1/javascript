
import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  limit: number;
};

export default function Pagination({
  currentPage,
  totalPages,
  limit,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageUrl = (page: number) =>
    `/products?page=${page}&limit=${limit}`;

  const pages = Array.from(
    { length: Math.min(5, totalPages) },
    (_, index) => {
      let start = Math.max(1, currentPage - 2);

      if (start + 4 > totalPages) {
        start = Math.max(1, totalPages - 4);
      }

      return start + index;
    }
  ).filter((page) => page <= totalPages);

  const linkClass =
    "rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-gray-100";

  const activeClass =
    "rounded-lg bg-black px-4 py-2 text-sm font-medium text-white";

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      {currentPage > 1 && (
        <Link
          href={getPageUrl(currentPage - 1)}
          className={linkClass}
          rel="prev"
        >
          Previous
        </Link>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={getPageUrl(page)}
          className={
            page === currentPage ? activeClass : linkClass
          }
          aria-current={
            page === currentPage ? "page" : undefined
          }
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={getPageUrl(currentPage + 1)}
          className={linkClass}
          rel="next"
        >
          Next
        </Link>
      )}
    </nav>
  );
}
