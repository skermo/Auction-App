import { ApiRequest } from "../config";

async function payForItem(token, data) {
  return ApiRequest(token)
    .post(`/payment`, data)
    .then((response) => {
      return response.data;
    });
}

export const paymentService = {
  payForItem,
};
