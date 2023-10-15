import React from "react";

const SearchBox = ({ searchText, setSearchText }) => {
  return (
    <div
      style={{
        width: "100%",
        borderBottom: "1px solid rgb(158, 155, 155)",
        height: "40px",
        // ":hover": { borderBottom: "1px solid blue" },
      }}
    >
      <input
        name="search"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        placeholder="Search by name, email or role"
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "10px",
          height: "40px",
          backgroundColor: "transparent",
          border: "none",
          outline: "none",
        }}
      />
    </div>
  );
};

export default SearchBox;
