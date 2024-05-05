import axios from 'axios';

/**
 * Fetches a list of products from the backend.
 * 
 * @returns {Promise<Array>} A promise that resolves to an array of product objects.
 */
export const fetchProducts = async () => {
    try {
        // Perform a GET request to the products endpoint
        const response = await axios.get('http://localhost:8080/api/products');
        
        // Return the data property which contains the list of products
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        
        // You can throw the error to handle it in the calling context
        throw error;
    }
};