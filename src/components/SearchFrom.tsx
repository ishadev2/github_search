import React from "react";

import { doSearch } from "../services/search";

import styles from "./SearchFrom.module.css";

const SearchFrom = (props: any): JSX.Element => {
  return (
    <div className={styles.searchContainer}>
      <form
        onSubmit={(e: React.SyntheticEvent) => {
          doSearch(e, props.searchWords, props.setRespond); //target, keywords, callback, page (optional)
        }}
      >
        <input
          type="text"
          name="keywords"
          placeholder="Search.."
          value={props.searchWords}
          onChange={(e: React.FormEvent<HTMLInputElement>): void =>
            props.setSearchWords(e.currentTarget.value)
          }
          data-testid="keywords_input"
        />
        <input
          type="submit"
          value="Search"
          disabled={props.searchWords.length < 2 || props.showLoader}
          data-testid="submit_btn"
        />
      </form>
    </div>
  );
};

export default SearchFrom;
