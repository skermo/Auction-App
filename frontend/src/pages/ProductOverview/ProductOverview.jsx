import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Gallery from "../../components/Gallery/Gallery";
import Tabs from "../../components/Tabs/Tabs";
import { itemService } from "../../services/itemService";
import { utils } from "../../utils/utils";
import "./product-overview.scss";

const ProductOverview = () => {
  const [item, setItem] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    itemService.getItemById(id).then((res) => setItem(res));
    window.scrollTo(0, 0);
  }, [id]);

  const price = utils.parseNum(item.startPrice);
  const timeLeft = utils.convertDate(item.startDate, item.endDate);

  return (
    <div className="overview-page">
      <Breadcrumbs headline={item.name} />
      <div className="product-information">
        <Gallery id={id} className="content" />
        <div className="content">
          <h1>{item.name}</h1>
          <p className="starts-from">
            Starts from <span>${price}</span>
          </p>
          <div className="information-block">
            <p>
              Highest bid: <span>${item.highestBid}</span>
            </p>
            <p>
              Number of bids: <span>{item.noBids}</span>
            </p>
            <p>
              Time left:
              <span> {timeLeft}</span>
            </p>
          </div>
          <div className="tab">
            <Tabs labels={["Details"]} className="secondary">
              <div>{item.description}</div>
              <div />
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
