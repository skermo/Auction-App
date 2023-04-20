import axios from "axios";
import { ApiTokenRequest, BASE_URL } from "../config";

async function getFirstItem() {
  const result = await axios.get(`${BASE_URL}/items/first-available`);
  return result.data || [];
}

async function getNewArrivals(pageNo) {
  const result = await axios.get(
    `${BASE_URL}/items/available?pageNo=${pageNo}&pageSize=8&sortBy=startDate&sortDir=desc`
  );
  return result.data || [];
}

async function getLastChance(pageNo) {
  const result = await axios.get(
    `${BASE_URL}/items/available?pageNo=${pageNo}&pageSize=8&sortBy=endDate&sortDir=asc`
  );
  return result.data || [];
}

async function getItemById(id) {
  const result = await axios.get(`${BASE_URL}/items/${id}`);
  return result.data || [];
}

async function getSearchedItems(name, category, pageNo) {
  const result = await axios.get(
    `${BASE_URL}/items/search?name=${name}&category=${category}&pageNo=${pageNo}&pageSize=3`
  );
  return result.data || [];
}

async function getActiveItemsBySellerId(sellerId, token) {
  const result = await ApiTokenRequest(token).get(
    `/items/seller/active/${sellerId}`
  );
  return result.data || [];
}

async function getSoldItemsBySellerId(sellerId, token) {
  const result = await ApiTokenRequest(token).get(
    `/items/seller/sold/${sellerId}`
  );
  return result.data || [];
}

async function getBiddedOnItemsBySellerId(sellerId, token) {
  const result = await ApiTokenRequest(token).get(
    `/items/seller/bids/${sellerId}`
  );
  return result.data || [];
}

export const itemService = {
  getFirstItem,
  getNewArrivals,
  getLastChance,
  getItemById,
  getSearchedItems,
  getActiveItemsBySellerId,
  getSoldItemsBySellerId,
  getBiddedOnItemsBySellerId,
};
