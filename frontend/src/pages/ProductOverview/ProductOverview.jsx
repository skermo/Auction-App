import classNames from "classnames";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Button from "../../components/Button/Button";
import Gallery from "../../components/Gallery/Gallery";
import InputField from "../../components/InputField/InputField";
import Tabs from "../../components/Tabs/Tabs";
import useAuth from "../../hooks/useAuth";
import { ArrowRight } from "../../resources/icons";
import { addNewBid } from "../../services/bidService";
import { itemService } from "../../services/itemService";
import { newBidValidationSchema } from "../../utils/formValidation";
import { utils } from "../../utils/utils";
import "./product-overview.scss";

const ProductOverview = () => {
  const [item, setItem] = useState([]);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [notificationClassName, setNotificatonClassName] = useState("");
  const [successfulBid, setSuccessfulBid] = useState(false);

  const { id } = useParams();
  const { auth } = useAuth();

  useEffect(() => {
    setSuccessfulBid(false);
    itemService.getItemById(id).then((res) => setItem(res));
  }, [id, successfulBid]);

  const price = utils.parseNum(item.startPrice);
  const highestBid = utils.parseNum(item.highestBid);
  const timeLeft = utils.convertDate(item.startDate, item.endDate);
  const newBid = utils.addFloats(highestBid, 1);
  const hasEndDatePassed = utils.hasDatePassed(item.endDate);

  const handleSubmit = async (value) => {
    try {
      const bid = {
        userId: auth?.user.id,
        itemId: item.id,
        amount: value.amount,
      };
      await addNewBid(bid, auth?.accessToken);
      if (value.amount > highestBid) {
        setNotificationMsg("Congrats! You are the highest bidder!");
        setNotificatonClassName("valid-amount");
        setSuccessfulBid(true);
      }
    } catch (error) {
      setNotificatonClassName("input-error");
      if (!error?.response) {
        setNotificationMsg("No Server Response");
      } else if (error.response?.status === 400) {
        if (value.amount <= highestBid) {
          setNotificationMsg(
            "There are higher bids than yours. You could give it a second try!"
          );
          setNotificatonClassName("invalid-amount");
        }
      } else {
        setNotificationMsg("Bidding Failed");
      }
    }
  };

  return (
    <div className="overview-page">
      <Breadcrumbs headline={item.name} />
      {notificationMsg && (
        <div
          className={classNames("notification-message", notificationClassName)}
        >
          {notificationMsg}
        </div>
      )}
      <div className="product-information">
        <Gallery id={id} className="content" />
        <div className="content">
          <h1>{item.name}</h1>
          <p className="starts-from">
            Starts from <span>${price}</span>
          </p>
          <div className="information-block">
            <p>
              Highest bid: <span>${highestBid}</span>
            </p>
            <p>
              Number of bids: <span>{item.noBids}</span>
            </p>
            <p>
              Time left:
              <span> {timeLeft}</span>
            </p>
          </div>
          {auth?.user && auth?.user.id !== item.sellerId && !hasEndDatePassed && (
            <Formik
              validationSchema={newBidValidationSchema}
              initialValues={{
                amount: "",
              }}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="input-fields">
                  <InputField
                    placeholder={`Enter $${newBid} or higher`}
                    autoComplete="off"
                    type="number"
                    name="amount"
                    id="amount"
                    className="width-60"
                  />
                  <Button
                    text="PLACE BID"
                    type="secondary"
                    className="text-dark padding-10"
                    Icon={ArrowRight}
                    model="submit"
                  />
                </div>
              </Form>
            </Formik>
          )}
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
