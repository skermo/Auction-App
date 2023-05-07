import axios from "axios";
import { BASE_URL } from "../config";

async function getImagesByItemId(itemId) {
  const result = await axios.get(`${BASE_URL}/images/item/${itemId}`);
  return result.data || [];
}

async function getImageByImageId(imageId) {
  const result = await axios.get(`${BASE_URL}/images/${imageId}`);
  return result.data || [];
}

export const imageService = {
  getImagesByItemId,
  getImageByImageId,
};
