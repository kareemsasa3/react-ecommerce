import axios from "axios";

/**
 * Fetches a list of products from the backend.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of product objects.
 */
export const fetchProducts = async () => {
  try {
    // Perform a GET request to the products endpoint
    const response = await axios.get(
      "spring-boot-ecommerce.railway.internal/api/products"
    );

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
    const response = await axios.get(
      `spring-boot-ecommerce.railway.internal/api/products/${productId}`
    );
    return response.data; // Return the fetched product
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    throw error; // Propagate the error for handling in the calling context
  }
};

export const fetchNewestProducts = async () => {
  try {
    const allProducts = await fetchProducts();
    return allProducts.slice(-5);
  } catch (error) {
    console.log("Error fetching products", error);
  }
};
