import axios from "axios";
import { BASE_URL } from "../config";

async function getAllCategories() {
  const result = await axios.get(`${BASE_URL}/categories`);
  return result.data || [];
}

export const categoryService = {
  getAllCategories,
};
