import axios from "axios";
import React from "react";
import Stripe from "react-stripe-checkout";

const Payment = () => {
  async function handleToken(token) {
    console.log(token);
    await axios
      .post("http://localhost:8080/api/payment/charge", "", {
        headers: {
          token: token.id,
          amount: 500,
        },
      })
      .then(() => {
        alert("Payment Success");
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <Stripe
      stripeKey="pk_test_51N3gQwJfjmrWeWPQ42O2aoDR0Y9nfU098cMHVhYxvpoNW4HKnJN7dCsO9u3lZPRU6R4OI2Wzj5tbuFAP4LhfeZaP00LP0yQWM2"
      token={handleToken}
    />
  );
};

export default Payment;
