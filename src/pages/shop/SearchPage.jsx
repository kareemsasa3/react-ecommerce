import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import fetchProductsByQuery from '../../api/fetchProductsByQuery';
import ProductList from '../../components/ProductList'; // Import ProductList component
import './Home.css';

const SearchPage = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q');

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const productsData = await fetchProductsByQuery(query);
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching search results:', error);
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSearchResults(); // Fetch products when the component mounts or query changes
    }, [query]);

    if (isLoading) {
        return <Header as='h3' textAlign='center'>Loading...</Header>;
    }

    if (hasError) {
        return <Header as='h3' textAlign='center'>Error loading search results</Header>;
    }

    if (products.length === 0) {
        return <Header as='h3' textAlign='center'>No products found for "{query}"</Header>;
    }

    return (
        <div className='search-page'>
            <Header as='h2' textAlign='center'>Search Results for "{query}"</Header>
            <ProductList products={products} /> {/* Use ProductList to render the search results */}
        </div>
    );
};

export default SearchPage;
