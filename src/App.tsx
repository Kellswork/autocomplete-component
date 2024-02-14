import "./App.css";
import { ChangeEvent, useCallback, useMemo } from "react";
import {MemoisedSuggestionList} from "./components/suggestionList";
import {MemoisedInputField} from "./components/inputField";
import AutoCompleteState from "./components/autoCompleteState";
import { filterList } from "./utils/helpers";

function App() {
  const {
    searchText,
    setSearchText,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    selectedSuggestion,
    setSelectedSuggestion,
    inputRef,
  } = AutoCompleteState();

  const filterSuggestions = useMemo(
    () => filterList(suggestions, searchText),
    [suggestions, searchText]
  );

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.currentTarget.value);
    setShowSuggestions(true);
  },[setSearchText, setShowSuggestions]);

  const handleOnClick = useCallback((event: React.MouseEvent<HTMLLIElement>) => {
    setShowSuggestions(false);
    if (event.currentTarget.textContent)
      setSearchText(event.currentTarget.textContent);
  }, [setShowSuggestions, setSearchText]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "ArrowUp":
        selectedSuggestion > 0 && setSelectedSuggestion((prev) => prev - 1);
        break;
      case "ArrowDown":
        selectedSuggestion < filterSuggestions.length - 1 &&
          setSelectedSuggestion((prev) => prev + 1);
        break;
      case "Enter":
        if (selectedSuggestion >= 0) {
          setShowSuggestions(false);
          setSearchText(filterSuggestions[selectedSuggestion].name);
        }
        break;
    }
  };

  return (
    <div className="autocomplete-container">
      <MemoisedInputField
        inputRef={inputRef}
        searchText={searchText}
        handleInputChange={handleInputChange}
        handleFocus={useCallback(() => setShowSuggestions(true), [setShowSuggestions])}
        handleKeyDown={handleKeyDown}
      />
      <MemoisedSuggestionList
        suggestions={filterSuggestions}
        showSuggestions={showSuggestions}
        handleOnClick={handleOnClick}
        selectedSuggestion={selectedSuggestion}
        searchText={searchText}
      />
    </div>
  );
}

export default App;
