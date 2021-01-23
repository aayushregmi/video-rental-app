import React from "react";

const Search = ({ name, value, onChange }) => {
  return (
    <div className="form-group">
      <input
        type="text"
        name={name}
        value={value}
        placeholder="Search..."
        className="form-control"
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </div>
  );
};

export default Search;
