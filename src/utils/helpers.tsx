import { useState, useEffect } from 'react';
import ResponseData from './type';

export function highlightMatch( suggestion: string, inputValue : string) {
  const index = suggestion.toLocaleLowerCase().indexOf(inputValue.toLocaleLowerCase());
  if (index === -1) return <>{suggestion}</>;

  const beforeMatch = suggestion.slice(0, index);
  const match = suggestion.slice(index, index + inputValue.length);
  const afterMatch = suggestion.slice(index + inputValue.length);

  return (
    <>
      {beforeMatch}
      <strong>{match}</strong>
      {afterMatch}
    </>
  );
}

export function useDebounce(inputValue: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue, delay]);

  return debouncedValue;
}

export const filterList = (list: ResponseData[], text: string) => list.filter((user) =>
user.name.toLowerCase().includes(text.toLowerCase()))