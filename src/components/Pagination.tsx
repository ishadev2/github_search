import { useEffect, useState } from "react";
import { doSearch } from "../services/search";

const Pagination = (props: any): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number>(1); //current page number

  useEffect(() => {
    setCurrentPage(1);
  }, [props.searchWords, props.resCount]);

  // show limited pagination spreading according to current page
  const pageNumbers = [];
  const pageTotal = Math.ceil(
    props.resCount / Number(process.env.REACT_APP_PER_PAGE_COUNT)
  );
  const startPage = currentPage > 5 ? currentPage - 5 : 1; // pagination first
  const lastPage = pageTotal < currentPage + 5 ? pageTotal : currentPage + 5; // pagination last

  for (let i = startPage; i <= lastPage; i++) {
    pageNumbers.push(i);
  }

  const paginatePage = (e: React.SyntheticEvent, i: number) => {
    setCurrentPage(i);
    doSearch(e, props.searchWords, props.setRespond, i); //target, keywords, callback, page (optional)
  };

  return (
    <div>
      {startPage > 1 && (
        <button
          key={1}
          onClick={(e: React.SyntheticEvent) => {
            paginatePage(e, 1);
          }}
          disabled={props.showLoader}
        >
          1 ...
        </button>
      )}
      {pageNumbers.length &&
        pageNumbers.map((pageNumber: number) => {
          return (
            <button
              key={pageNumber}
              onClick={(e: React.SyntheticEvent) => {
                paginatePage(e, pageNumber);
              }}
              className={currentPage === pageNumber ? "active" : ""}
              disabled={props.showLoader}
            >
              {pageNumber}
            </button>
          );
        })}
      {lastPage < pageTotal && (
        <button
          key={pageTotal}
          onClick={(e: React.SyntheticEvent) => {
            paginatePage(e, pageTotal);
          }}
          disabled={props.showLoader}
        >
          ... {pageTotal}
        </button>
      )}
    </div>
  );
};

export default Pagination;
