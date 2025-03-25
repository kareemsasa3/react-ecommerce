import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { fetchFandomByFandomId } from '../../api/spring/fetchById';
import ProductList from './ProductList';
import { Loader, Grid, Header, Segment } from 'semantic-ui-react';
import "./FandomList.css";

const FandomList = ({ fandomId: propFandomId}) => {
    const { fandomId: paramFandomId } = useParams();
    const fandomId = propFandomId || paramFandomId;

    const [fandom, setFandom] = useState(null);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const loadFandomDetails = async () => {
            try {
                const fandomData = await fetchFandomByFandomId(parseInt(fandomId, 10));
                setFandom(fandomData);
                setProducts(fandomData.products);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching fandom:', error);
                setHasError(true);
            }
        };

        if (fandomId) {
            loadFandomDetails();
        }
    }, [fandomId]);

    if (isLoading) {
        return <Loader active inline="centered">Loading products...</Loader>
    }

    if (hasError) {
        return (
            <Segment>
                <Header as='h3' textAlign='center'>Error fetching products. Please try again later.</Header>
            </Segment>
        );
    }

    if (products.length === 0) { // Handle no products
        return (
            <Segment>
                <Header as='h3' textAlign='center'>No products found in this category.</Header> // Display when no products
            </Segment>
        );
    }

    const resultsText = products.length === 1 ? "1 result found" : `${products.length} results found`;

    return (
        <div className='fandom-list'>
            <Grid>
                <Grid.Row columns={2}>
                    <Grid.Column textAlign='left'>
                        <h1 className='fandom-name'>{fandom?.name}</h1>
                    </Grid.Column>
                    <Grid.Column textAlign='right'>
                        <Header as='h3' className='results-count'>{resultsText}</Header>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <div className='products'>
                <ProductList products={products} />
            </div>
        </div>
    );
};

export default FandomList;