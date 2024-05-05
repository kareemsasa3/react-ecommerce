import axios from 'axios';

/**
 * Fetches products by category ID.
 *
 * @param {number} categoryId - The ID of the category.
 * @returns {Promise<Array>} - A promise resolving to an array of products.
 */
export const fetchProductsByCategoryId = async (categoryId) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/products/by-category/${categoryId}`);
        return response.data; // Return the list of products
    } catch (error) {
        console.error('Error fetching products by category:', error);
        throw error; // Re-throw to be handled by the calling function
    }
};
