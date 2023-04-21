import { ApiTokenRequest } from "../config";

export const addNewBid = async (bid, token) => {
  return ApiTokenRequest(token)
    .post("/bids/new-bid", bid)
    .then((response) => {
      return response.data;
    });
};
