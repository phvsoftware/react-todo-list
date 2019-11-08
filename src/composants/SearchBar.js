import React from "react";
import "./SearchBar.css";
import SearchIcon from "./SearchIcon";
import ClearIcon from "./ClearIcon";

const SearchBar = props => {
  const clearText = () => {
    props.searchChange("");
  };

  return (
    <div className="search-box">
      <input
        placeholder="Chercher..."
        value={props.search}
        onChange={event => {
          props.searchChange(event.target.value);
        }}
      ></input>
      <div className="icon-box" onClick={() => clearText()}>
        {props.search === "" && <SearchIcon />}
        {props.search !== "" && <ClearIcon />}
      </div>
    </div>
  );
};

export default SearchBar;
