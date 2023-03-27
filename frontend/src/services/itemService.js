import axios from "axios";
import { BASE_URL } from "../config";

async function getFirstItem() {
  const result = await axios.get(`${BASE_URL}/items/first-available`);
  return result.data || [];
}

async function getNewArrivals(pageNo) {
  const result = await axios.get(
    `${BASE_URL}/items/available?pageNo=${pageNo}&pageSize=4&sortBy=startDate&sortDir=desc`
  );
  return result.data || [];
}

async function getLastChance(pageNo) {
  const result = await axios.get(
    `${BASE_URL}/items/available?pageNo=${pageNo}&pageSize=4&sortBy=endDate&sortDir=asc`
  );
  return result.data || [];
}

export const itemService = {
  getFirstItem,
  getNewArrivals,
  getLastChance,
};