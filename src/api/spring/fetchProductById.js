import axios from 'axios';

/**
 * Fetches a product by its ID from the backend.
 *
 * @param {number} productId - The ID of the product to fetch.
 * @returns {Promise<Object>} A promise that resolves to the product object.
 */
export const fetchProductById = async (productId) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/products/${productId}`);
        return response.data; // Return the fetched product
    } catch (error) {
        console.error(`Error fetching product with ID ${productId}:`, error);
        throw error; // Propagate the error for handling in the calling context
    }
};