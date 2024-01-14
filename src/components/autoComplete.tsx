const AutoComplete = () => {
  return (
    <div className="autocomplete-container">
      <input type="text" placeholder="Search users" />
      <ul className="suggestions"></ul>
    </div>
  );
};

export default AutoComplete;
