import { useEffect, useState } from "react";

import Search from "./components/Search";
import ResultView from "./components/ResultView";
import LoadingScreen from "./components/LoadingScreen";

import { loaderStatus } from "./services/loader";

import "./App.css";

const App = (): JSX.Element => {
  const [searchWords, setSearchWords] = useState<string>(""); //stores keywords to search
  const [respond, setRespond] = useState<any[]>([]); //stores returned responce
  const [showLoader, setShowLoader] = useState<any>(false);

  // subscribe to loader status
  loaderStatus.subscribe(result => {
    setShowLoader(result);
  });

  // render the use view
  return (
    <div className="App">
      {showLoader && <LoadingScreen />}
      <Search
        searchWords={searchWords}
        setSearchWords={setSearchWords}
        setRespond={setRespond}
        showLoader={showLoader}
      />
      <ResultView
        searchWords={searchWords}
        results={respond}
        setRespond={setRespond}
        showLoader={showLoader}
      ></ResultView>
    </div>
  );
};

export default App;
