import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import GridItem from "../../components/GridItem/GridItem";
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

  useEffect(() => {
    itemService.getSearchedItems(name, category, 0).then((res) => {
      setItems(res.content);
      setLastPage(res.last);
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

  return (
    <div className="shop-page">
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
              <Button type="primary" text="EXPLORE MORE" onClick={fetchData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
