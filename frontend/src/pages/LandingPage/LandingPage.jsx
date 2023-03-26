import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import GridItem from "../../components/GridItem/GridItem";
import HighlightedProduct from "../../components/HighlightedProduct/HighlightedProduct";
import Loader from "../../components/Loader/Loader";
import Tabs from "../../components/Tabs/Tabs";
import { categoryService } from "../../services/categoryService";
import { itemService } from "../../services/itemService";
import "./landing-page.scss";

const LandingPage = () => {
  const [categories, setCategories] = useState([]);
  const [item, setItem] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [lastChance, setLastChance] = useState([]);
  const [hasMoreNewArrivals, setHasMoreNewArrivals] = useState(true);
  const [hasMoreLastChance, setHasMoreLastChance] = useState(true);
  const [pageNewArrivals, setPageNewArrivals] = useState(1);
  const [pageLastChance, setPageLastChance] = useState(1);

  useEffect(() => {
    categoryService.getAllCategories().then((res) => setCategories(res));
    itemService.getFirstItem().then((res) => setItem(res));
    itemService.getNewArrivals(0).then((res) => setNewArrivals(res));
    itemService.getLastChance(0).then((res) => setLastChance(res));
  }, []);

  const fetchNewArrivalsData = () => {
    itemService.getNewArrivals(pageNewArrivals).then((res) => {
      setNewArrivals([...newArrivals, ...res]);
      if (res.length === 0) {
        setHasMoreNewArrivals(false);
      }
      setPageNewArrivals(pageNewArrivals + 1);
    });
  };

  const fetchLastChanceData = () => {
    itemService.getLastChance(pageLastChance).then((res) => {
      setLastChance([...lastChance, ...res]);
      if (res.length === 0) {
        setHasMoreLastChance(false);
      }
      setPageLastChance(pageLastChance + 1);
    });
  };

  return (
    <div className="landing-page">
      <div className="top-part">
        <ul title="CATEGORIES" className="categories-list">
          {categories.map((value, key) => (
            <li key={value.id}>{value.name}</li>
          ))}
        </ul>
        {item && <HighlightedProduct item={item} />}
      </div>
      <div>
        <Tabs labels={["New Arrivals", "Last Chance"]}>
          <div>
            <InfiniteScroll
              dataLength={newArrivals.length}
              next={fetchNewArrivalsData}
              hasMore={hasMoreNewArrivals}
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
              hasMore={hasMoreLastChance}
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
