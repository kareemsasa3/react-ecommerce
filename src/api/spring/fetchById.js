import axios from "axios";

// Define the base URLs for different environments
const DEV_API_URL = "http://localhost:8080/api"; // Local development URL
const PROD_API_URL = "https://spring-boot-ecommerce/api"; // Production URL

// Determine the API base URL depending on the environment
const BASE_URL =
  window.location.hostname === "localhost" ? DEV_API_URL : PROD_API_URL;

/**
 * Fetches products by category ID.
 *
 * @param {number} categoryId - The ID of the category.
 * @returns {Promise<Array>} - A promise resolving to an array of products.
 */
export const fetchProductsByCategoryId = async (categoryId) => {
  try {
    console.log("BASE_URL", BASE_URL);
    const response = await axios.get(
      `${BASE_URL}/products/by-category/${categoryId}`
    );
    return response.data; // Return the list of products
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error; // Re-throw to be handled by the calling function
  }
};

/**
 * Fetches a category by its ID from the backend.
 *
 * @param {number} productId - The ID of the product to use to fetch the category.
 * @returns {Promise<Object>} A promise that resolves to the category object.
 */
export const fetchCategoryByProductId = async (productId) => {
  try {
    console.log("BASE_URL", BASE_URL);
    const response = await axios.get(
      `${BASE_URL}/products/category-by-product/${productId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching category id by product id:", error);
    throw error;
  }
};

/**
 * Fetches a category by its ID from the backend.
 *
 * @param {number} categoryId - The ID of the category to fetch.
 * @returns {Promise<Object>} A promise that resolves to the category object.
 */
export const fetchCategoryByCategoryId = async (categoryId) => {
  try {
    console.log("BASE_URL", BASE_URL);
    const response = await axios.get(`${BASE_URL}/categories/${categoryId}`);
    return response.data; // Return the array of categories
  } catch (error) {
    console.error("Error fetching categories:", error); // Log any errors
    throw error; // Re-throw to be handled by the calling function
  }
};

/**
 * Fetches a fandom by its ID.
 *
 * @param {number} fandomId - The ID of the fandom.
 * @returns {Promise<Object>} A promise that resolves to the fandom object.
 */
export const fetchFandomByFandomId = async (fandomId) => {
  try {
    console.log("BASE_URL", BASE_URL);
    const response = await axios.get(`${BASE_URL}/fandoms/${fandomId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching fandoms:", error);
    throw error;
  }
};

/**
 * Fetches addresses by user ID.
 *
 * @param {number} userId - The ID of the user.
 * @returns {Promise<Object>} A promise that resolves to the addresses.
 */
export const fetchAddressesByUserId = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/addresses/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching addresses:", error);
    throw error;
  }
};
