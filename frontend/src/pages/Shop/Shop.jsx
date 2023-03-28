import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Button from "../../components/Button/Button";
import GridItem from "../../components/GridItem/GridItem";
import { itemService } from "../../services/itemService";
import "./shop.scss";

const Shop = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const { query } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    itemService.getSearchedItems(query, 0).then((res) => setItems(res));
  }, [query]);

  const fetchData = () => {
    itemService.getSearchedItems(query, page).then((res) => {
      setItems([...items, ...res]);
      if (res.length === 0 || res.length < 9) {
        setHasMore(false);
      }
      setPage(page + 1);
    });
  };

  return (
    <div className="shop-page">
      <div className="content">
        <div className="products">
          {items.map((value, key) => {
            return (
              <GridItem key={value.id} item={value} className="portrait" />
            );
          })}
        </div>
        <div className="button">
          {hasMore && (
            <Button type="primary" text="EXPLORE MORE" onClick={fetchData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
