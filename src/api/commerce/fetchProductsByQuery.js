import fetchProducts from "./fetchProducts";

const fetchProductsByQuery = async (query) => {
    try {
        const products = await fetchProducts();

        const filteredProducts = products.filter((product) => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
        );

        return filteredProducts;
    } catch (error) {
        console.error('Error fetching products by query: ', error);
        throw error;
    }
};

export default fetchProductsByQuery;