import axios from 'axios';

/**
 * Fetches a list of fandoms from the backend.
 * 
 * @returns {Promise<Array>} A promise that resolves to an array of fandom objects.
 */
export const fetchFandoms = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/fandoms/'); // Adjust the endpoint URL
        return response.data; // Return the array of categories
    } catch (error) {
        console.error('Error fetching fandoms:', error); // Log any errors
        throw error; // Re-throw to be handled by the calling function
    }
};