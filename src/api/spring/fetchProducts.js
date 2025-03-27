import axios from "axios";

// Define the base URLs for development and production
const DEV_API_URL = "http://localhost:8080/api"; // Ensure to add 'http://'
const PROD_API_URL = "https://spring-boot-ecommerce/api";

// Determine if the environment is production or development
const API_URL =
  window.location.hostname === "localhost" ? DEV_API_URL : PROD_API_URL;

/**
 * Fetches a list of products from the backend.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of product objects.
 */
export const fetchProducts = async () => {
  try {
    // Perform a GET request to the products endpoint
    console.log("API_URL", API_URL);
    const response = await axios.get(`${API_URL}/products`);

    // Return the data property which contains the list of products
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);

    // You can throw the error to handle it in the calling context
    throw error;
  }
};

/**
 * Fetches a product by its ID from the backend.
 *
 * @param {number} productId - The ID of the product to fetch.
 * @returns {Promise<Object>} A promise that resolves to the product object.
 */
export const fetchProductById = async (productId) => {
  try {
    console.log("BASE_URL", API_URL);

    const response = await axios.get(`${API_URL}/products/${productId}`);
    return response.data; // Return the fetched product
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    throw error; // Propagate the error for handling in the calling context
  }
};

/**
 * Fetches the newest products.
 *
 * @returns {Promise<Array>} A promise that resolves to the array of the latest products.
 */
export const fetchNewestProducts = async () => {
  try {
    console.log("BASE_URL", API_URL);
    const allProducts = await fetchProducts();
    return allProducts.slice(-5); // Return the last 5 products
  } catch (error) {
    console.log("Error fetching newest products", error);
    throw error;
  }
};
