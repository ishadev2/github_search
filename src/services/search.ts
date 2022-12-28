import axios from "axios";

// get search results from API
const doSearch = async (e: React.SyntheticEvent, keywords: string, callback: any, page: number = 1): Promise<any> => {
  e.preventDefault();

  const { data } = await axios.get(String(process.env.REACT_APP_API_URL), {
    params: {
      q: keywords,
      page: page
    }
  });

  callback(data);
};

export {doSearch}