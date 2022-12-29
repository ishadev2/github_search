import { useEffect, useState } from "react";

import Pagination from "./Pagination";

import styles from "./ResultView.module.css";

const ResultView = (props: any): JSX.Element => {
  const [results, setResults] = useState<any[]>(); //stores returned results
  const [resCount, setResCount] = useState<number>(0); //stores result count

  useEffect((): void => {
    setResults(props.results.items);
    setResCount(props.results.total_count);
  }, [props.results]);

  return (
    <div className={styles.resultContainer}>
      {resCount < 0 ? (
        <div className={styles.resultInfo}>
          Error occurred. Please try again later.
        </div>
      ) : (
        resCount >= 0 && (
          <div className={styles.resultInfo}>
            {resCount} result{resCount > 1 && "s"} found. {resCount > 1000 && "(1000 records visible)"}
          </div>
        )
      )}

      {resCount > Number(process.env.REACT_APP_PER_PAGE_COUNT) && (
        <Pagination
          resCount={resCount}
          searchWords={props.searchWords}
          setRespond={props.setRespond}
          showLoader={props.showLoader}
        />
      )}

      <div className={styles.resultList}>
        {results &&
          results.map((entry: any, i: number) => {
            return (
              <a
                key={i}
                className={styles.resultItem}
                href={entry.html_url}
                target="_blank"
              >
                <div className={styles.resultTitle}>{entry.name}</div>
                <div className={styles.resultDesc}>{entry.description}</div>
                <div className={styles.resultDesc}>By, {entry.owner.url}</div>
              </a>
            );
          })}

        {!results && <div className={styles.resultDesc}>Enter the keywords to search public repositories from GitHub</div>}
      </div>
    </div>
  );
};

export default ResultView;
