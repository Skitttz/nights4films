import React from 'react';

const PaginationReview = ({
  totalItems,
  currentPage,
  onPageChange,
  limitItemPage,
}) => {
  const limitItemPerPage = limitItemPage;

  function handlePageChange(newPage) {
    onPageChange(newPage);
  }

  function renderPagination(totalItems) {
    if (totalItems) {
      const totalPages = Math.ceil(totalItems / limitItemPerPage);
      const maxButtonsToShow = 7;
      const pageButtons = [];

      let startPage = Math.max(1, currentPage - 3);
      let endPage = Math.max(1, currentPage + 3);

      if (totalPages > 7) {
        if (endPage - startPage < maxButtonsToShow - 1) {
          if (currentPage < totalPages / 2) {
            endPage = Math.min(startPage + maxButtonsToShow - 1, totalPages);
          } else {
            startPage = Math.max(endPage - maxButtonsToShow + 1, 1);
          }
        }
      } else {
        startPage = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
        endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={
              currentPage === i
                ? 'active text-lg font-roboto bg-[#6B42B2] hover:bg-[#6B42B2] text-slate-200 font-bold py-1 px-3 rounded-md mx-3 cursor-pointer transition-transform duration-500 scale-100'
                : 'font-roboto text-lg  text-slate-600 hover:text-white scale-[.9] mx-3'
            }
          >
            {i}
          </button>,
        );
      }
      return pageButtons;
    } else {
      return null;
    }
  }
  return (
    <div className="flex justify-center items-center align-middle justify-items-center mt-4">
      {renderPagination(totalItems)}
    </div>
  );
};

export default PaginationReview;
