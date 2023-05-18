import classNames from "classnames";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Button from "../../components/Button/Button";
import Gallery from "../../components/Gallery/Gallery";
import InputField from "../../components/InputField/InputField";
import Payment from "../../components/Payment/Payment";
import PopUp from "../../components/PopUp/PopUp";
import Tabs from "../../components/Tabs/Tabs";
import useAuth from "../../hooks/useAuth";
import { ArrowRight } from "../../resources/icons";
import { addNewBid, bidService } from "../../services/bidService";
import { itemService } from "../../services/itemService";
import { newBidValidationSchema } from "../../utils/formValidation";
import { utils } from "../../utils/utils";
import "./product-overview.scss";

const ProductOverview = () => {
  const [item, setItem] = useState([]);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [notificationClassName, setNotificatonClassName] = useState("");
  const [successfulBid, setSuccessfulBid] = useState(false);
  const [isUserHighestBidder, setIsUserHighestBidder] = useState(false);
  const [openPopUpPayment, setOpenPopUpPayment] = useState(false);
  const [openPopUpBid, setOpenPopUpBid] = useState(false);
  const [isBought, setIsBought] = useState(false);
  const [formValues, setFormValues] = useState([]);

  const { id } = useParams();
  const { auth } = useAuth();

  useEffect(() => {
    if (Object.keys(auth).length !== 0) {
      bidService
        .isHighestBidder(id, auth?.user?.id)
        .then((res) => setIsUserHighestBidder(res));
    }
  }, [auth, id]);

  useEffect(() => {
    setSuccessfulBid(false);
    itemService.getItemById(id).then((res) => {
      setItem(res);
      if (res.buyerId) {
        setIsBought(true);
      }
    });
  }, [id, successfulBid]);

  const price = utils.parseNum(item.startPrice);
  const highestBid = utils.parseNum(item.highestBid);
  const timeLeft = utils.convertDate(item.endDate);
  const newBid = utils.addFloats(highestBid, 1);
  const hasEndDatePassed = utils.hasDatePassed(item.endDate);

  const submitBid = async (value) => {
    try {
      const bid = {
        userId: auth?.user.id,
        itemId: item.id,
        amount: value.amount,
      };
      await addNewBid(bid, auth?.accessToken);
      if (value.amount > highestBid) {
        setNotificationMsg("You are the highest bidder!");
        setNotificatonClassName("valid-amount");
        setSuccessfulBid(true);
      }
    } catch (error) {
      setNotificatonClassName("input-error");
      if (!error?.response) {
        setNotificationMsg("No Server Response");
      } else if (error.response?.status === 400) {
        if (value.amount <= highestBid) {
          setNotificationMsg("There are higher bids than yours.");
          setNotificatonClassName("invalid-amount");
        }
      } else {
        setNotificationMsg("Bidding Failed");
      }
    }
  };

  const handleSubmit = async (value) => {
    setOpenPopUpBid(true);
    setFormValues(value);
  };

  return (
    <div className="overview-page">
      {openPopUpPayment && (
        <PopUp closePopUp={setOpenPopUpPayment} className="payment-modal">
          <Payment item={item} isBought={setIsBought} />
        </PopUp>
      )}
      {openPopUpBid && (
        <PopUp closePopUp={setOpenPopUpBid} className="are-you-sure">
          <h3 className="title">Are you sure?</h3>
          <div>
            <div className="text-value">
              <div className="property">You're about to place a bid of: </div>
              <div className="value">{formValues.amount}$</div>
            </div>
            <div className="text-value">
              <div className="property">On: </div>
              <div className="value">{item.name}</div>
            </div>
            <div className="footer">
              <Button
                text="CANCEL"
                type="tertiary"
                className="text-dark"
                onClick={() => setOpenPopUpBid(false)}
              />
              <Button
                text="CONTINUE"
                type="primary"
                onClick={() => {
                  setOpenPopUpBid(false);
                  submitBid(formValues);
                }}
              />
            </div>
          </div>
        </PopUp>
      )}
      <Breadcrumbs headline={item.name} />
      {notificationMsg && (
        <div
          className={classNames("notification-message", notificationClassName)}
        >
          {notificationMsg}
        </div>
      )}

      <div className="product-information">
        <Gallery id={id} sellerId={item.sellerId} className="content" />
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
            {hasEndDatePassed ? (
              <p>
                Auction: <span>finished</span>
              </p>
            ) : (
              <p>
                Time left:
                <span> {timeLeft}</span>
              </p>
            )}
          </div>
          {auth?.user && auth?.user.id !== item.sellerId && !hasEndDatePassed && (
            <Formik
              validationSchema={newBidValidationSchema}
              initialValues={{
                amount: "",
              }}
              onSubmit={(values, { resetForm }) => {
                handleSubmit(values);
                resetForm();
              }}
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
          {auth?.user &&
            auth?.user.id !== item.sellerId &&
            hasEndDatePassed &&
            isUserHighestBidder && (
              <div className="pay-button">
                {isBought ? (
                  <Button
                    text="BOUGHT"
                    type="disabled"
                    className="btn-full-width"
                    disabled
                  />
                ) : (
                  <Button
                    text="PAY"
                    type="primary"
                    className="btn-full-width"
                    onClick={() => {
                      setOpenPopUpPayment(true);
                    }}
                  />
                )}
              </div>
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
