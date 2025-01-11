// PaginationComponent.tsx
import React, { useEffect, useState } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  maxVisiblePages?: number; // Maximum number of visible pages
}

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
}) => {
  const [paginationItems, setPaginationItems] = useState<JSX.Element[]>([]);

  useEffect(() => {
    renderPaginationItems();
  }, [currentPage, totalPages]); // Re-render pagination items when currentPage or totalPages changes

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  const renderPaginationItems = () => {
    const items: JSX.Element[] = [];
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (startPage > 1) {
      items.push(
        <li key={1} className="page-item">
          <button className="page-link " onClick={() => handlePageClick(1)}>
            1
          </button>
        </li>
      );
      if (startPage > 2) {
        items.push(
          <li key="padding-prev" className="page-item disabled">
            <span className="page-link ">...</span>
          </li>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
        >
          <button
            className={`page-link ${currentPage === i ? "red" : ""}`}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </button>
        </li>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <li key="padding-next" className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
      }
      items.push(
        <li key={totalPages} className="page-item">
          <button
            className="page-link"
            onClick={() => handlePageClick(totalPages)}
          >
            {totalPages}
          </button>
        </li>
      );
    }

    setPaginationItems(items);
  };

  return (
    <ul className="pagination justify-content-end">
      <li
        className={`page-item  previous ${currentPage === 1 ? "disabled" : ""}`}
      >
        <button className="page-link" onClick={handlePreviousClick}>
          Previous
        </button>
      </li>
      {paginationItems}
      <li
        className={`page-item next ${
          currentPage === totalPages ? "disabled" : ""
        }`}
      >
        <button className="page-link" onClick={handleNextClick}>
          Next
        </button>
      </li>
    </ul>
  );
};

export default PaginationComponent;
