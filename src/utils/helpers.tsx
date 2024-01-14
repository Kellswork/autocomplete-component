
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