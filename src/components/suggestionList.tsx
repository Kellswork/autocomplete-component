import { FC } from "react";
import ResponseData from "../utils/type";

interface Props {
  showSuggestions: boolean;
  searchText: string;
  suggestions: ResponseData[];
}

const SuggestionList: FC<Props> = ({
  suggestions,
  showSuggestions,
  searchText,
}) => {
  if (showSuggestions && searchText) {
    return (suggestions.length) ? (
      <ul className="suggestions">
        {suggestions.map((suggestion) => (
          <li key={suggestion.email}>{suggestion.name}</li>
        ))}
      </ul>
    ) : (
      <div className="no-options">No options</div>
    );
  } else return null
};
export default SuggestionList;
