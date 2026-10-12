import { getPageNumbers } from '../../utils/pagination';

export default function PaginationReview({ totalItems, currentPage, onPageChange, limitItemPage }: {
  totalItems: number; currentPage: number; onPageChange: (page: number) => void; limitItemPage: number;
}) {
  return <nav aria-label="Páginas de reviews" className="flex justify-center gap-4 mt-4">
    {getPageNumbers(totalItems, limitItemPage, currentPage).map(page => (
      <button type="button" key={page} aria-label={`Página ${page}`} aria-current={page === currentPage ? 'page' : undefined}
        onClick={() => onPageChange(page)} className={page === currentPage ? 'bg-[#6B42B2] rounded-md px-3 py-1 text-slate-200' : 'text-slate-400 hover:text-white'}>{page}</button>
    ))}
  </nav>;
}
