import React, { ChangeEvent, FC, LegacyRef } from "react";

interface Props {
  inputRef: LegacyRef<HTMLInputElement>;
  searchText: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleFocus: () => void;
}

const InputField: FC<Props> = ({
  inputRef,
  searchText,
  handleInputChange,
  handleFocus,
  handleKeyDown,
}) => {
  return (
    <input
      type="text"
      placeholder="Search users"
      ref={inputRef}
      value={searchText}
      onChange={handleInputChange}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
    />
  );
};

export default InputField;
