import { ChangeEvent, useEffect, useState } from "react";
import ResponseData from "../utils/type";
import SuggestionList from "./suggestionList";
import { FileteredData } from "../utils/api";

function AutoComplete() {
  const [searchText, setSearchText] = useState<string>("");
  const [suggestions, setSuggestions] = useState<ResponseData[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const filteredData = await FileteredData(searchText);
      if (filteredData) {
        setSuggestions(filteredData);
      }
      return filteredData;
    })();
  }, [searchText]);

  const handleInputChange =  (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.currentTarget.value);
    setShowSuggestions(true);
  };

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        value={searchText}
        onChange={handleInputChange}
        placeholder="Search users"
      />
      <SuggestionList
        suggestions={suggestions}
        searchText={searchText}
        showSuggestions={showSuggestions}
      />
    </div>
  );
}

export default AutoComplete;
