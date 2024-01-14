import { ChangeEvent, useEffect, useRef, useState } from "react";
import ResponseData from "../utils/type";
import SuggestionList from "./suggestionList";
import { FileteredData } from "../utils/api";

function AutoComplete() {
  const [searchText, setSearchText] = useState<string>("");
  const [suggestions, setSuggestions] = useState<ResponseData[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

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

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        ref={inputRef}
        value={searchText}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        placeholder="Search users"
      />
      <SuggestionList
        suggestions={suggestions}
        showSuggestions={showSuggestions}
        handleOnClick={handleOnClick}
      />
    </div>
  );
}

export default AutoComplete;
