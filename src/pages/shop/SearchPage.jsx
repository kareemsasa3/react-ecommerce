import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header, Segment, Grid } from 'semantic-ui-react';
import fetchProductsByQuery from '../../api/commerce/fetchProductsByQuery';
import ProductList from '../../components/lists/ProductList';
import LoadingScreen from '../../util/LoadingScreen';
import './SearchPage.css';

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

        fetchSearchResults();
    }, [query]);

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (hasError) {
        return (
            <Segment>
                <Header as='h3' textAlign='center'>Error loading search results. Please try again later.</Header>
            </Segment>
        );
    }

    if (products.length === 0) {
        return (
            <Segment>
                <Header as='h3' textAlign='center'>No products found for "{query}"</Header>
            </Segment>
        );
    }

    const resultsText = products.length === 1
        ? "1 result found"
        : `${products.length} results found`;

    return (
        <div className='search-page'>
            <Grid>
                <Grid.Row columns={2}>
                    <Grid.Column textAlign='left'>
                        <div className='search-header'>
                            <Header as='h2'>SEARCH RESULTS</Header>
                        </div>
                        <h1 className='search-query'>{query}</h1>
                    </Grid.Column>
                    <Grid.Column textAlign='right'>
                        <div className='results-count'>
                            <Header as='h3' className='results-count'>
                                {resultsText}
                            </Header>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <div className='products'>
                <ProductList products={products} />
            </div>
        </div>
    );
};

export default SearchPage;
