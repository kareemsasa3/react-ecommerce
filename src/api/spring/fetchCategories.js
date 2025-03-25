import axios from 'axios';

/**
 * Fetches a list of categories from the backend.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of category objects.
 */
export const fetchCategories = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/categories'); // Adjust the endpoint URL
        return response.data; // Return the array of categories
    } catch (error) {
        console.error('Error fetching categories:', error); // Log any errors
        throw error; // Re-throw to be handled by the calling function
    }
};