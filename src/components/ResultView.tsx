import { useEffect, useState } from "react";

import Pagination from "./Pagination";

import styles from "./ResultView.module.css";

const ResultView = (props: any): JSX.Element => {
  const [results, setResults] = useState<any[]>([]); //stores returned results
  const [resCount, setResCount] = useState<number>(0); //stores result count

  useEffect((): void => {
    setResults(props.results.items);
    setResCount(props.results.total_count);
  }, [props.results]);

  return (
    <div className={styles.resultContainer}>
      {resCount < 0 ? (
        <div className={styles.resultInfo}>Error occurred. Please try again later.</div>
      ) : (
        <div className={styles.resultInfo}>{resCount} result(s) found</div>
      )}

      <div className={styles.resultList}>
        {results &&
          results.map((entry: any, i: number) => {
            return (
              <div key={i} className={styles.resultItem}>
                {entry.id} - {entry.name}
              </div>
            );
          })}
      </div>
      <Pagination
        resCount={resCount}
        searchWords={props.searchWords}
        setRespond={props.setRespond}
        showLoader={props.showLoader}
      />
    </div>
  );
};

export default ResultView;
