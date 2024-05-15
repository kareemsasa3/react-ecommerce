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

/**
 * Fetches a category by its ID from the backend.
 *
 * @param {number} productId - The ID of the product to use to fetch the category.
 * @returns {Promise<Object>} A promise that resolves to the category object.
 */
export const fetchCategoryByProductId = async (productId) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/products/category-by-product/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching category id by product id:', error);
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
        const response = await axios.get(`http://localhost:8080/api/categories/${categoryId}`); // Adjust the endpoint URL
        return response.data; // Return the array of categories
    } catch (error) {
        console.error('Error fetching categories:', error); // Log any errors
        throw error; // Re-throw to be handled by the calling function
    }
};

export const fetchFandomByFandomId = async (fandomId) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/fandoms/${fandomId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching fandoms:', error);
        throw error
    }
};