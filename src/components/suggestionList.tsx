import { FC, MouseEvent } from "react";
import ResponseData from "../utils/type";

interface Props {
  showSuggestions: boolean;
  selectedSuggestion: number;
  suggestions: ResponseData[];
  handleOnClick: (event: MouseEvent<HTMLLIElement>) => void;
}

const SuggestionList: FC<Props> = ({
  suggestions,
  showSuggestions,
  handleOnClick,
  selectedSuggestion,
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
            {suggestion.name}
          </li>
        ))}
      </ul>
    ) : (
      <div className="no-options">No options</div>
    );
  } else return null;
};
export default SuggestionList;
