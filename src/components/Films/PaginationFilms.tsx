import React, { useEffect, useMemo, useState } from 'react';
import { getPageNumbers } from '../../utils/pagination';

interface PaginationFilmsProps {
  totalItems: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  limitItemPage: number;
  contentRef?: React.RefObject<HTMLDivElement | null>;
  isMobile?: boolean;
  contentReady?: boolean;
}

const PaginationFilms = ({
  totalItems,
  currentPage,
  onPageChange,
  limitItemPage,
  contentRef,
  isMobile,
  contentReady,
}: PaginationFilmsProps) => {
  const limitItemPerPage = limitItemPage;
  const [isFloating, setIsFloating] = useState(false);
  const totalPages = useMemo(() => (totalItems ? Math.ceil(totalItems / limitItemPerPage) : 0), [totalItems, limitItemPerPage]);

  function handlePageChange(newPage: number) {
    onPageChange(newPage);
  }

  useEffect(() => {
    const el = contentRef?.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsFloating(false);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const shouldFloat = Boolean(entry.isIntersecting && totalPages > 1);
        setIsFloating(shouldFloat);
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [contentRef, totalPages, contentReady]);

  const pageButtons = getPageNumbers(totalItems, limitItemPerPage, currentPage).map(page => (
    <button type="button" key={page} aria-label={`Página ${page}`} aria-current={page === currentPage ? 'page' : undefined}
      onClick={() => handlePageChange(page)}
      className={page === currentPage ? 'bg-[#6B42B2] text-slate-200 rounded-md py-1 px-3 mx-2' : 'text-slate-400 hover:text-white mx-2'}>{page}</button>
  ));
  const staticClasses = 'flex justify-center items-center align-middle justify-items-center mt-4 transition-all duration-300 opacity-100 translate-y-0';
  const floatingClasses = 'fixed bottom-3 left-1/2 -translate-x-1/2 z-20 tm:flex desktop:hidden cardMD:hidden items-center gap-2 px-4 py-2 rounded-full bg-gray-900/85 backdrop-blur-sm border border-slate-800 shadow-[0_8px_20px_rgba(0,0,0,0.35)] transition-all duration-300';
  const containerClass = isFloating && isMobile ? floatingClasses : staticClasses;
  const hiddenWhenNoPages = totalPages === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100';
  return <div className={`${containerClass} ${hiddenWhenNoPages}`}>{pageButtons}</div>;
};

export default PaginationFilms;
