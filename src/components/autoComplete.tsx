import { ChangeEvent, useState } from 'react'

function AutoComplete() {
  const [searchText, setSearchText] = useState<string>("");

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.currentTarget.value);
  };

    return (
        <div className="autocomplete-container">
            <input
                type="text"
                value={searchText}
                onChange={handleInputChange}
                placeholder="Search users"
            />
            <ul className="suggestions"></ul>
        </div>
    )
}

export default AutoComplete
