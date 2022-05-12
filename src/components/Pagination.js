import React, { useEffect, useState } from "react";
import "./Pagination.css";
import config from "../config/index";

const Pagination = ({ page, setPage, totalNumberOfPages }) => {
    const pageLimit = config.MAX_PAGE;

    const [start, setstart] = useState(1);
    const [end, setEnd] = useState(Math.min(pageLimit, totalNumberOfPages));

    const getPaginationButtons = (start, end) => {
        return Array.from(
            { length: (end - start) / 1 + 1 },
            (_, i) => start + i * 1
        );
    };

    const [pageNum, setPageNum] = useState(getPaginationButtons(start, end, 1));

    const checkRange = () => {
        setPageNum(getPaginationButtons(start, totalNumberOfPages));
    };

    //TO FIRST PAGE
    const toFirstPage = () => {
        setPage(1);
    };

    //PREVIOUS PAGE
    const toPreviousPage = () => {
        setPage((page) => Math.max(page - 1, 1));
    };

    //1,2,3,4
    const customPage = (page) => {
        const pageNumber = Math.max(1, page);
        setPage(Math.min(pageNumber, totalNumberOfPages));
    };

    //NEXT PAGE
    const toNextPage = () => setPage(Math.min(page + 1, totalNumberOfPages));

    //LAST PAGE
    const toLastPage = () => setPage(totalNumberOfPages);

    useEffect(() => {
        checkRange();
    }, [totalNumberOfPages, page]);

    return (
        <>
            <ul className="pagination-area">
                <button
                    className={`page-no${page === 1 ? " not-active" : ""}`}
                    onClick={toFirstPage}
                >
                    <span className="pagination-content">
                        {`${String.fromCharCode(60)}${String.fromCharCode(60)}`}
                    </span>
                </button>
                <button
                    className={`page-no${page === 1 ? " not-active" : ""}`}
                    onClick={toPreviousPage}
                >
                    <span className="pagination-content">
                        {String.fromCharCode(60)}
                    </span>
                </button>

                {pageNum.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => customPage(item)}
                        className={`page-no${page === item ? " active" : ""}`}
                    >
                        <span className="pagination-content">{item}</span>
                    </button>
                ))}
                <button
                    className={`page-no${
                        page === totalNumberOfPages ? " not-active" : ""
                    }`}
                    onClick={toNextPage}
                >
                    <span className="pagination-content">
                        {String.fromCharCode(62)}
                    </span>
                </button>
                <button
                    className={`page-no${
                        page === totalNumberOfPages ? " not-active" : ""
                    }`}
                    onClick={toLastPage}
                >
                    <span className="pagination-content">
                        {`${String.fromCharCode(62)}${String.fromCharCode(62)}`}
                    </span>
                </button>
            </ul>
        </>
    );
};

export default Pagination;
