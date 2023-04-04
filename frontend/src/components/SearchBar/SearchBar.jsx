import React, { useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import searchIcon from "../../resources/icons/searchIcon.svg";
import { SHOP } from "../../routes";
import "./search-bar.scss";

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  var category = searchParams.get("category");
  if (category === null) {
    category = "";
  }

  var name = searchParams.get("name");
  if (name === null) {
    name = "";
  }
  const [updated, setUpdated] = useState(name);

  const params = { name: updated, category: category };
  const navigate = useNavigate();

  const handleChange = (event) => {
    setUpdated(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      navigate({
        pathname: SHOP,
        search: `?${createSearchParams(params)}`,
      });
    }
  };

  return (
    <input
      type="text"
      placeholder="Search.."
      className="search-bar"
      style={{ backgroundImage: `url(${searchIcon})` }}
      value={updated}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
};

export default SearchBar;
