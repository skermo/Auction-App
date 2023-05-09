import React, { useEffect, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Select from "react-select";
import Button from "../../components/Button/Button";
import Checkbox from "../../components/Checkbox/Checkbox";
import { customStyle1 } from "../../components/CustomSelect/selectStyles";
import GridItem from "../../components/GridItem/GridItem";
import { SHOP } from "../../routes/routes";
import { categoryService } from "../../services/categoryService";
import { itemService } from "../../services/itemService";
import "./shop.scss";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  let name = searchParams.get("name");
  let category = searchParams.get("category");
  let sortBy = searchParams.get("sortBy");
  let sortDir = searchParams.get("sortDir");

  let sortValue;

  switch (sortBy) {
    case "startDate":
      sortValue = "new";
      break;
    case "endDate":
      sortValue = "old";
      break;
    case "startPrice":
      if (sortDir === "asc") {
        sortValue = "low";
      } else {
        sortValue = "high";
      }
      break;
    default:
      sortValue = "default";
      break;
  }

  const sortOptions = [
    { value: "default", label: "Default Sorting" },
    { value: "new", label: "Time left: New to Old" },
    { value: "old", label: "Time left: Old to New" },
    { value: "low", label: "Price: Low to High" },
    { value: "high", label: "Price: High to Low" },
  ];

  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checkedCategory, setCheckedCategory] = useState(category);
  const [lastPage, setLastPage] = useState(false);
  const [page, setPage] = useState(1);
  const [didYouMean, setDidYouMean] = useState("");

  useEffect(() => {
    itemService
      .getSearchedItems(name, category, 0, sortBy, sortDir)
      .then((res) => {
        setItems(res.items.content);
        setLastPage(res.items.last);
        setDidYouMean(res.didYouMean);
        if (didYouMean !== "") {
          name = didYouMean;
        }
      });
    setCheckedCategory(category);
    setPage(1);
  }, [name, category, sortBy, sortDir]);

  useEffect(() => {
    categoryService.getAllCategories().then((res) => setCategories(res));
  }, []);

  const handleClick = (event) => {
    if (event.target.value === checkedCategory) {
      setSearchParams({
        name: name,
        category: "",
        sortBy: sortBy,
        sortDir: sortDir,
      });
      setCheckedCategory("");
    } else {
      setCheckedCategory(event.target.value);
      setSearchParams({
        name: name,
        category: event.target.value,
        sortBy: sortBy,
        sortDir: sortDir,
      });
    }
    setPage(1);
  };

  const sortItems = (sortBy) => {
    if (Array.isArray(sortOptions) && sortOptions) {
      switch (sortBy) {
        case "old":
          setSearchParams({
            name: name,
            category: category,
            sortBy: "endDate",
            sortDir: "desc",
          });
          break;
        case "new":
          setSearchParams({
            name: name,
            category: category,
            sortBy: "startDate",
            sortDir: "desc",
          });
          break;
        case "low":
          setSearchParams({
            name: name,
            category: category,
            sortBy: "startPrice",
            sortDir: "asc",
          });
          break;
        case "high":
          setSearchParams({
            name: name,
            category: category,
            sortBy: "startPrice",
            sortDir: "desc",
          });
          break;
        default:
          setSearchParams({
            name: name,
            category: category,
            sortBy: "name",
            sortDir: "asc",
          });
          break;
      }
    }
  };

  const fetchData = () => {
    itemService
      .getSearchedItems(name, category, page, sortBy, sortDir)
      .then((res) => {
        setItems([...items, ...res.items.content]);
        setLastPage(res.items.last);
        setPage(page + 1);
      });
  };

  const fetchSuggestedData = () => {
    itemService
      .getSearchedItems(didYouMean, category, 0, sortBy, sortDir)
      .then((res) => {
        setItems(res.items.content);
        setLastPage(res.items.last);
      });
    setSearchParams({
      name: didYouMean,
      category: category,
      sortBy: sortBy,
      sortDir: sortDir,
    });
  };

  return (
    <div className="shop-page">
      {didYouMean !== "" && items.length === 0 && (
        <div className="did-you-mean">
          Did you mean?
          <span onClick={fetchSuggestedData}>{didYouMean}</span>
        </div>
      )}
      {items.length === 0 ? (
        <div className="item-not-found">
          <h1>No results found.</h1>
          <div>
            <Button
              type="secondary"
              text="GO BACK"
              onClick={() => {
                setCheckedCategory("");
                navigate({
                  pathname: SHOP,
                  search: `?${createSearchParams({
                    name: "",
                    category: "",
                  })}`,
                });
              }}
              className="btn-go-back"
            />
          </div>
        </div>
      ) : (
        <div className="content">
          <div className="forms">
            <form>
              <ul title="PRODUCT CATEGORIES">
                {categories.map((value, key) => {
                  return (
                    <li key={value.id}>
                      <Checkbox
                        value={value.name}
                        name="categories"
                        onChange={handleClick}
                        checked={checkedCategory === value.name}
                      />
                      {value.name}
                    </li>
                  );
                })}
              </ul>
            </form>
          </div>
          <div className="sort-products">
            <div className="sort">
              <Select
                value={
                  Array.isArray(sortOptions) && sortOptions
                    ? sortOptions.find((option) => option.value === sortValue)
                    : ""
                }
                options={sortOptions}
                styles={customStyle1}
                menuPosition="fixed"
                components={{
                  IndicatorSeparator: () => null,
                }}
                onChange={(option) => {
                  sortItems(option.value);
                }}
              />
            </div>
            <div className="products">
              {items.map((value, key) => {
                return (
                  <GridItem key={value.id} item={value} className="portrait" />
                );
              })}
              <div className="button">
                {!lastPage && (
                  <Button
                    type="primary"
                    text="EXPLORE MORE"
                    onClick={fetchData}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
