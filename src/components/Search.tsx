import React, { useState } from "react";

import { doSearch } from "../services/search";

import styles from "./Search.module.css";

const Search = (props: any): JSX.Element => {
  const [keywords, setKeywords] = useState<string>("ichigo-api"); //stores keywords to search

  return (
    <div className={styles.searchContainer}>
      <form
        onSubmit={(e: React.SyntheticEvent) => {
          doSearch(e, keywords, props.setRespond); //target, keywords, callback, page (optional)
        }}
      >
        <div>
          <input
            type="text"
            name="keywords"
            value={keywords}
            onChange={(e: React.FormEvent<HTMLInputElement>): void =>
              setKeywords(e.currentTarget.value)
            }
          />
        </div>
        <div>
          <input type="submit" value="Search" disabled={keywords.length < 2} />
        </div>
      </form>
    </div>
  );
};

export default Search;
