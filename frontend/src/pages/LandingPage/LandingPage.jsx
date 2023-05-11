import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { createSearchParams, useNavigate } from "react-router-dom";
import GridItem from "../../components/GridItem/GridItem";
import HighlightedProduct from "../../components/HighlightedProduct/HighlightedProduct";
import Loader from "../../components/Loader/Loader";
import Tabs from "../../components/Tabs/Tabs";
import useAuth from "../../hooks/useAuth";
import { SHOP } from "../../routes/routes";
import { categoryService } from "../../services/categoryService";
import { itemService } from "../../services/itemService";
import "./landing-page.scss";

const LandingPage = () => {
  const [categories, setCategories] = useState([]);
  const [item, setItem] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [lastChance, setLastChance] = useState([]);
  const [pageNewArrivals, setPageNewArrivals] = useState(0);
  const [pageLastChance, setPageLastChance] = useState(0);
  const [lastPageNewArrivals, setLastPageNewArrivals] = useState(false);
  const [lastPageLastChance, setLastPageLastChance] = useState(false);
  const [recommendedItems, setRecommendedItems] = useState([]);

  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    categoryService.getAllCategories().then((res) => setCategories(res));
    itemService.getFirstItem().then((res) => setItem(res));
    if (Object.keys(auth).length !== 0) {
      itemService
        .getRecommendedItems(auth?.user?.id, auth?.accessToken)
        .then((res) => setRecommendedItems(res));
    }
    fetchNewArrivalsData();
    fetchLastChanceData();
  }, [auth]);

  const fetchNewArrivalsData = () => {
    itemService.getNewArrivals(pageNewArrivals).then((res) => {
      setNewArrivals([...newArrivals, ...res.content]);
      setLastPageNewArrivals(res.last);
      setPageNewArrivals(pageNewArrivals + 1);
    });
  };

  const fetchLastChanceData = () => {
    itemService.getLastChance(pageLastChance).then((res) => {
      setLastChance([...lastChance, ...res.content]);
      setLastPageLastChance(res.last);
      setPageLastChance(pageLastChance + 1);
    });
  };

  const searchByCategory = (categoryName) => {
    navigate({
      pathname: SHOP,
      search: `?${createSearchParams({ name: "", category: categoryName })}`,
    });
  };

  return (
    <div className="landing-page">
      <div className="top-part">
        <ul title="CATEGORIES" className="categories-list">
          {categories.map((value, key) => (
            <li key={value.id} onClick={() => searchByCategory(value.name)}>
              {value.name}
            </li>
          ))}
          <li onClick={() => searchByCategory("")}>All Categories</li>
        </ul>
        {item && <HighlightedProduct item={item} />}
      </div>
      {recommendedItems.length > 0 && (
        <div className="recommendations">
          <div className="recommended-text">Recommended Products</div>
          <div className="recommended-items">
            {recommendedItems.map((value, key) => (
              <GridItem
                item={value}
                key={value.id}
                className="recommendation"
              />
            ))}
          </div>
        </div>
      )}
      <div>
        <Tabs labels={["New Arrivals", "Last Chance"]}>
          <div>
            <InfiniteScroll
              dataLength={newArrivals.length}
              next={fetchNewArrivalsData}
              hasMore={!lastPageNewArrivals}
              loader={<Loader />}
            >
              {newArrivals.map((value, key) => {
                return <GridItem key={value.id} item={value} />;
              })}
            </InfiniteScroll>
          </div>
          <div>
            <InfiniteScroll
              dataLength={lastChance.length}
              next={fetchLastChanceData}
              hasMore={!lastPageLastChance}
              loader={<Loader />}
            >
              {lastChance.map((value, key) => {
                return <GridItem key={value.id} item={value} />;
              })}
            </InfiniteScroll>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default LandingPage;
