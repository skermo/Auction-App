import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import Payment from "./Payment";

const PUBLIC_KEY =
  "pk_test_51N3gQwJfjmrWeWPQ42O2aoDR0Y9nfU098cMHVhYxvpoNW4HKnJN7dCsO9u3lZPRU6R4OI2Wzj5tbuFAP4LhfeZaP00LP0yQWM2";
const stripePromise = loadStripe(
  "pk_test_51N3gQwJfjmrWeWPQ42O2aoDR0Y9nfU098cMHVhYxvpoNW4HKnJN7dCsO9u3lZPRU6R4OI2Wzj5tbuFAP4LhfeZaP00LP0yQWM2"
);
const SripeContainer = () => {
  return (
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  );
};

export default SripeContainer;
