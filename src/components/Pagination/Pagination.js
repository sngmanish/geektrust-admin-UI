import React, { useMemo } from "react";
import "./Pagination.css";
import config from "../../config/index";

// page onchange, count

const Pagination = ({ page, onChange, count }) => {
  const pageLimit = config.MAX_PAGE;

  const pageNum = useMemo(
    () =>
      Array.from({ length: Math.min(pageLimit, count) }, (_, i) => 1 + i * 1),
    [count, page]
  );

  const customPage = (e, page) => {
    const pageNumber = Math.max(1, page);
    onChange(e, Math.min(pageNumber, count));
  };

  return (
    <>
      <ul className="pagination-area">
        <button
          className={`page-no${page === 1 ? " not-active" : ""}`}
          onClick={(e) => onChange(e, 1)}
        >
          <span className="pagination-content">{"<<"}</span>
        </button>
        <button
          className={`page-no${page === 1 ? " not-active" : ""}`}
          onClick={(e) => onChange((page) => Math.max(page - 1, 1))}
        >
          <span className="pagination-content">{"<"}</span>
        </button>

        {pageNum.map((item, index) => (
          <button
            key={index}
            onClick={(e) => customPage(e, item)}
            className={`page-no${page === item ? " active" : ""}`}
          >
            <span className="pagination-content">{item}</span>
          </button>
        ))}
        <button
          className={`page-no${page === count ? " not-active" : ""}`}
          onClick={(e) => onChange(e, Math.min(page + 1, count))}
        >
          <span className="pagination-content">{">"}</span>
        </button>
        <button
          className={`page-no${page === count ? " not-active" : ""}`}
          onClick={(e) => onChange(e, count)}
        >
          <span className="pagination-content">{">>"}</span>
        </button>
      </ul>
    </>
  );
};

export default Pagination;
