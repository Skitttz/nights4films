export function getPageNumbers(totalItems: number, pageSize: number, currentPage: number, maxButtons = 7): number[] {
  if (totalItems <= 0 || pageSize <= 0 || maxButtons <= 0) return [];
  const totalPages = Math.ceil(totalItems / pageSize);
  const page = Math.min(Math.max(1, currentPage), totalPages);
  const count = Math.min(totalPages, maxButtons);
  const start = Math.max(1, Math.min(page - Math.floor(count / 2), totalPages - count + 1));
  return Array.from({ length: count }, (_, index) => start + index);
}
