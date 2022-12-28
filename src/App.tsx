import { useState } from "react";

import Search from "./components/Search";
import ResultView from "./components/ResultView";

import "./App.css";

const App = (): JSX.Element => {
  const [respond, setRespond] = useState<any[]>([]); //stores returned responce

  return (
    <div className="App">
      <Search setRespond={setRespond} />
      <ResultView results={respond}></ResultView>
    </div>
  );
};

export default App;

/*
- Use the following API from GitHub: https://docs.github.com/en/rest/reference/search
- Implement a design in CSS. It can be as simple as you want.
- Implement throttling to fetch data from the API.
- Implement pagination.
*/