import { FC, MouseEvent } from "react";
import ResponseData from "../utils/type";
import { highlightMatch } from "../utils/helpers";

interface Props {
  showSuggestions: boolean;
  selectedSuggestion: number;
  suggestions: ResponseData[];
  searchText: string;
  handleOnClick: (event: MouseEvent<HTMLLIElement>) => void;
}

const SuggestionList: FC<Props> = ({
  suggestions,
  showSuggestions,
  handleOnClick,
  selectedSuggestion,
  searchText
}) => {
  if (showSuggestions) {
    return suggestions.length ? (
      <ul className="suggestions">
        {suggestions.map((suggestion, index) => (
          <li
            className={
              selectedSuggestion === index ? "suggestion active" : "suggestion"
            }
            key={suggestion.email}
            onClick={handleOnClick}
          >
            {highlightMatch(suggestion.name, searchText)}
          </li>
        ))}
      </ul>
    ) : (
      <div className="no-options">No options</div>
    );
  } else return null;
};
export default SuggestionList;
