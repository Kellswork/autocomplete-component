import { ChangeEvent } from "react";
import SuggestionList from "./suggestionList";
import InputField from "./inputField";
import AutoCompleteState from "./autoCompleteState";

function AutoComplete() {
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

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.currentTarget.value);
    setShowSuggestions(true);
  };

  const handleOnClick = (event: React.MouseEvent<HTMLLIElement>) => {
    setShowSuggestions(false);
    if(event.currentTarget.textContent) setSearchText(event.currentTarget.textContent);
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
        searchText={searchText}
      />
    </div>
  );
}

export default AutoComplete;
