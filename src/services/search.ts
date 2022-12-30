import React from "react";
import axios from "axios";

import { loaderStatus } from "../services/loader";
import { throttleStatus } from "../services/throttler";

// get search results from API
const doSearch = async (e: React.SyntheticEvent, keywords: string, callback: any, page: number = 1): Promise<any> => {
  e.preventDefault();

  let throttleHolder:any = false;

  throttleStatus.subscribe(result => {
    throttleHolder = result;
  });

  if (!throttleHolder) {
    loaderStatus.next(true); // start loader

    //console.log(keywords, page, Number(process.env.REACT_APP_PER_PAGE_COUNT));

    try {
      const { data } = await axios.get(String(process.env.REACT_APP_API_URL), {
        /*headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`
        },*/
        params: {
          q: keywords,
          page: page,
          per_page: Number(process.env.REACT_APP_PER_PAGE_COUNT)
        }
      });

      callback(data);
    } catch (e: any) {
      callback({ total_count: -1, items: [] }); // pass -1 as count to denote the error
      console.log("Error Occurred : " + e.message);
    }

    loaderStatus.next(false); // finish loader

    throttleStatus.next(true); // set throttling
  }

  // release throttling after given time
  setTimeout(() => {
    throttleStatus.next(false);
  }, Number(process.env.REACT_APP_API_THROTTLING_DELAY));
};

export { doSearch };
