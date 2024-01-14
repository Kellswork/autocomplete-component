import { FC, MouseEvent } from "react";
import ResponseData from "../utils/type";

interface Props {
  showSuggestions: boolean;
  searchText: string;
  suggestions: ResponseData[];
  handleOnClick: (event: MouseEvent<HTMLLIElement>) => void;
}

const SuggestionList: FC<Props> = ({
  suggestions,
  showSuggestions,
  searchText,
  handleOnClick
}) => {
  if (showSuggestions && searchText) {
    return (suggestions.length) ? (
      <ul className="suggestions">
        {suggestions.map((suggestion) => (
          <li className="suggestion" key={suggestion.email} onClick={handleOnClick}>{suggestion.name}</li>
        ))}
      </ul>
    ) : (
      <div className="no-options">No options</div>
    );
  } else return null
};
export default SuggestionList;
