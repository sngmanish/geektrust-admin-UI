import React from "react";

const SearchBox = ({ searchText, setSearchText }) => {
  return (
    <div
      style={{
        width: "100%",
        border: "1px solid rgb(158, 155, 155)",
      }}
    >
      <input
        className="search-box"
        name="search"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        placeholder="Search by name, email or role"
      />
    </div>
  );
};

export default SearchBox;
