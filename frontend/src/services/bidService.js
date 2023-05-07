import axios from "axios";
import { ApiRequest, BASE_URL } from "../config";

export const addNewBid = async (bid, token) => {
  return ApiRequest(token)
    .post("/bids", bid)
    .then((response) => {
      return response.data;
    });
};

async function isHighestBidder(itemId, userId) {
  const result = await axios.get(
    `${BASE_URL}/bids/highest-bid/${userId}/${itemId}`
  );
  return result.data || [];
}

async function getBidByUserAndItem(itemId, userId) {
  const result = await axios.get(`${BASE_URL}/bids/${userId}/${itemId}`);
  return result.data || [];
}

export const bidService = {
  isHighestBidder,
  getBidByUserAndItem,
};
