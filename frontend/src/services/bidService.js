import { ApiRequest } from "../config";

export const addNewBid = async (bid, token) => {
  return ApiRequest(token)
    .post("/bids/new-bid", bid)
    .then((response) => {
      return response.data;
    });
};
