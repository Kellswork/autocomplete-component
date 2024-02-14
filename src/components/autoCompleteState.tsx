import { useEffect, useRef, useState } from "react";
import ResponseData from "../utils/type";
import {  fetchData } from "../utils/api";
import { useDebounce } from "../utils/helpers";

const AutoCompleteState = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [suggestions, setSuggestions] = useState<ResponseData[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedInputValue = useDebounce(searchText, 300)
  
  useEffect(() => {
    (async () => {
      const fetchedData = await fetchData();
      if (!fetchedData) return
      
      setSuggestions(fetchedData);
      return fetchedData;
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
  }, [debouncedInputValue]);

  return {
    searchText,
    setSearchText,
    suggestions,
    setSuggestions,
    showSuggestions,
    setShowSuggestions,
    selectedSuggestion,
    setSelectedSuggestion,
    inputRef
  };
};

export default AutoCompleteState;
