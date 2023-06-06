import React, { useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { SearchIcon } from "../../resources/icons";
import { SHOP } from "../../routes/routes";
import "./search-bar.scss";

const SearchBar = () => {
  const [searchParams] = useSearchParams();

  const name = searchParams.get("name") || "";
  const category = searchParams.get("category") || "";
  const sortBy = searchParams.get("sortBy") || "";
  const sortDir = searchParams.get("sortDir") || "";

  const [searchTerm, setSearchTerm] = useState(name);

  const params = {
    name: searchTerm.trim(),
    category: category,
    sortBy: sortBy,
    sortDir: sortDir,
  };
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const navigateToShop = () => {
    navigate({
      pathname: SHOP,
      search: `?${createSearchParams(params)}`,
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && searchTerm.trim().length) {
      navigateToShop();
    }
  };

  return (
    <div className="search-bar-outer">
      <input
        type="text"
        placeholder="Search.."
        className="search-bar"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <SearchIcon
        className="icon"
        onClick={() => {
          searchTerm.trim().length && navigateToShop();
        }}
      />
    </div>
  );
};

export default SearchBar;
