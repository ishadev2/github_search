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
      <div className={styles.resultInfo}>{resCount} result(s) found</div>
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
      <Pagination resCount={resCount} />
    </div>
  );
};

export default ResultView;
