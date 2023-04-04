import React, { useEffect, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Button from "../../components/Button/Button";
import GridItem from "../../components/GridItem/GridItem";
import { SHOP } from "../../routes";
import { categoryService } from "../../services/categoryService";
import { itemService } from "../../services/itemService";
import "./shop.scss";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  var name = searchParams.get("name");
  var category = searchParams.get("category");

  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checkedCategory, setCheckedCategory] = useState(category);
  const [lastPage, setLastPage] = useState(false);
  const [page, setPage] = useState(1);
  const [didYouMean, setDidYouMean] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    itemService.getSearchedItems(name, category, 0).then((res) => {
      setItems(res.content);
      setLastPage(res.last);
      setDidYouMean(res.didYouMean);
      if (didYouMean !== "") {
        name = didYouMean;
      }
    });
    categoryService.getAllCategories().then((res) => setCategories(res));
  }, [name, category]);

  const handleClick = (event) => {
    if (event.target.value === checkedCategory) {
      setSearchParams({ name: name, category: "" });
      setCheckedCategory("");
    } else {
      setCheckedCategory(event.target.value);
      setSearchParams({ name: name, category: event.target.value });
    }
  };

  const fetchData = () => {
    itemService.getSearchedItems(name, category, page).then((res) => {
      setItems([...items, ...res.content]);
      setLastPage(res.last);
      setPage(page + 1);
    });
  };

  const fetchSuggestedData = () => {
    itemService.getSearchedItems(didYouMean, category, 0).then((res) => {
      setItems(res.content);
      setLastPage(res.last);
    });
    setSearchParams({ name: didYouMean, category: category });
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
                      <input
                        type="checkbox"
                        value={value.name}
                        name="categories"
                        checked={checkedCategory === value.name}
                        onChange={handleClick}
                      />
                      {value.name}
                    </li>
                  );
                })}
              </ul>
            </form>
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
      )}
    </div>
  );
};

export default Shop;
