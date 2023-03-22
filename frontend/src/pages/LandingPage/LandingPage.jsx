import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import GridItem from "../../components/GridItem/GridItem";
import HighlightedProduct from "../../components/HighlightedProduct/HighlightedProduct";
import Loader from "../../components/Loader/Loader";
import Tabs from "../../components/Tabs/Tabs";
import { CategoryService } from "../../services/CategoryService";
import { ItemService } from "../../services/ItemService";
import "./landing-page.scss";

const LandingPage = () => {
  const [categories, setCategories] = useState([]);
  const [item, setItem] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [page, setpage] = useState(0);

  useEffect(() => {
    CategoryService.getAll().then((res) => setCategories(res));
    ItemService.getFirstItem().then((res) => setItem(res));
    const getNewArrivals = async () => {
      /*const res = await fetch(
        `http://localhost:8080/api/items?pageNo=0&pageSize=4&sortBy=startDate&sortDir=desc`
      );
      const data = await res.json();
      setNewArrivals(data);*/
      ItemService.getNewArrivals(0).then((res) => setNewArrivals(res));
    };

    getNewArrivals();
  }, []);

  const fetchNewArrivals = async () => {
    /*const res = await fetch(
      `http://localhost:8080/api/items?pageNo=${page}&pageSize=4&sortBy=startDate&sortDir=desc`
    );
    const data = await res.json();
    return data;*/
    return ItemService.getNewArrivals(page);
  };

  const fetchNewArrivalsData = async () => {
    const newArrivalsFromServer = await fetchNewArrivals();

    setNewArrivals([...newArrivals, ...newArrivalsFromServer]);
    if (newArrivalsFromServer.length === 0) {
      sethasMore(false);
    }
    setpage(page + 1);
  };

  return (
    <div className="landing-page">
      <div className="top-part">
        <ul title="CATEGORIES" className="categories-list">
          {categories.map((value, key) => (
            <li key={value.id}>{value.name}</li>
          ))}
        </ul>
        {item != null && (
          <HighlightedProduct item={JSON.parse(JSON.stringify(item))} />
        )}
      </div>
      <div>
        <Tabs className="new-arrivals">
          <div label="New Arrivals">
            <InfiniteScroll
              dataLength={newArrivals.length}
              next={fetchNewArrivalsData}
              hasMore={hasMore}
              loader={<Loader />}
            >
              {newArrivals.map((value, key) => {
                return <GridItem key={value.id} item={value} />;
              })}
            </InfiniteScroll>
          </div>
          <div label="Last chance"></div>
        </Tabs>
      </div>
    </div>
  );
};

export default LandingPage;
