import React from "react";

import { doSearch } from "../services/search";

import styles from "./Search.module.css";

const Search = (props: any): JSX.Element => {
  return (
    <div className={styles.searchContainer}>
      <form
        onSubmit={(e: React.SyntheticEvent) => {
          doSearch(e, props.searchWords, props.setRespond); //target, keywords, callback, page (optional)
        }}
      >
        <div>
          <input
            type="text"
            name="keywords"
            value={props.searchWords}
            onChange={(e: React.FormEvent<HTMLInputElement>): void =>
              props.setSearchWords(e.currentTarget.value)
            }
          />
        </div>
        <div>
          <input
            type="submit"
            value="Search"
            disabled={props.searchWords.length < 2 || props.showLoader}
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
