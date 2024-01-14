import { ChangeEvent, useEffect, useRef, useState } from "react";
import ResponseData from "../utils/type";
import SuggestionList from "./suggestionList";
import { FileteredData } from "../utils/api";
import InputField from "./inputField";

function AutoComplete() {
  const [searchText, setSearchText] = useState<string>("");
  const [suggestions, setSuggestions] = useState<ResponseData[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<number>(-1);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const filteredData = await FileteredData(searchText);
      if (filteredData) {
        setSuggestions(filteredData);
      }
      return filteredData;
    })();

    const handleFocusOut = (event: globalThis.MouseEvent) => {
      // Check if the click is outside the input element
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("click", handleFocusOut);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleFocusOut);
    };
  }, [searchText]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.currentTarget.value);
    setShowSuggestions(true);
  };

  const handleOnClick = (event: React.MouseEvent<HTMLLIElement>) => {
    setShowSuggestions(false);
    setSearchText(event.currentTarget.innerText);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "ArrowUp":
        selectedSuggestion > 0 && setSelectedSuggestion((prev) => prev - 1);
        break;
      case "ArrowDown":
        selectedSuggestion < suggestions.length - 1 &&
          setSelectedSuggestion((prev) => prev + 1);
        break;
      case "Enter":
        if (selectedSuggestion >= 0) {
          setShowSuggestions(false);
          setSearchText(suggestions[selectedSuggestion].name);
        }
        break;
    }
  };

  return (
    <div className="autocomplete-container">
      <InputField
        inputRef={inputRef}
        searchText={searchText}
        handleInputChange={handleInputChange}
        handleFocus={() => setShowSuggestions(true)}
        handleKeyDown={handleKeyDown}
      />
      <SuggestionList
        suggestions={suggestions}
        showSuggestions={showSuggestions}
        handleOnClick={handleOnClick}
        selectedSuggestion={selectedSuggestion}
      />
    </div>
  );
}

export default AutoComplete;
