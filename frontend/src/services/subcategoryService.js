import axios from "axios";
import { BASE_URL } from "../config";

async function getSubcategoriesByCategoryId(categoryId) {
  const result = await axios.get(
    `${BASE_URL}/subcategories/category/${categoryId}`
  );
  return result.data || [];
}

async function getAllSubcategories() {
  const result = await axios.get(`${BASE_URL}/subcategories`);
  return result.data || [];
}

export const subcategoryService = {
  getSubcategoriesByCategoryId,
  getAllSubcategories,
};
