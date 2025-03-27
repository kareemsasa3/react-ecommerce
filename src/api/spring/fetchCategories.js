import axios from "axios";

const DEV_API_URL = "http://localhost:8080/api"; // Ensure to add 'http://'
const PROD_API_URL =
  "https://spring-boot-ecommerce-production-d688.up.railway.app/api";

// Determine if the environment is production or development
const API_URL =
  window.location.hostname === "localhost" ? DEV_API_URL : PROD_API_URL;

/**
 * Fetches a list of categories from the backend.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of category objects.
 */
export const fetchCategories = async () => {
  try {
    console.log("BASE_URL", API_URL);
    const response = await axios.get(`${API_URL}/categories`); // Adjust the endpoint URL
    return response.data; // Return the array of categories
  } catch (error) {
    console.error("Error fetching categories:", error); // Log any errors
    throw error; // Re-throw to be handled by the calling function
  }
};
