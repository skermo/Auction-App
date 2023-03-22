import axios from "axios";
import { BASE_URL } from "./config";

async function getFirstItem() {
  const result = await axios.get(`${BASE_URL}/items/first-by-availability`);
  return result.data || [];
}

async function getNewArrivals(pageNo) {
  const result = await axios.get(
    `${BASE_URL}/items?pageNo=${pageNo}&pageSize=8&sortBy=startDate&sortDir=desc`
  );
  return result.data || [];
}

export const ItemService = {
  getFirstItem,
  getNewArrivals,
};
