import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Header, Button } from 'semantic-ui-react';
import fetchProductById from '../../api/fetchProductById';

const Product = () => {
    const { id } = useParams();
    const location = useLocation(); // To get the current location/search params
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const loadProductById = async () => {
            try {
                const productData = await fetchProductById(id);
                setProduct(productData);
            } catch (error) {
                console.error('Error loading product: ', error);
            }
        };

        loadProductById();
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const { name, price, description, image } = product;
    const descriptionWithNewlines = description.replace(/<\/p>/g, '<br> ');

    // Check if there is a search query to return to
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('q'); // Get the search query from the URL

    return (
        <div className="product">
            <Header as='h2' textAlign='center'>{name}</Header>
            <img src={image.url} alt={name} />
            <div className='description'>
                <h3>{name}</h3>
                <h4>{price.formatted_with_symbol}</h4>
                <p dangerouslySetInnerHTML={{ __html: descriptionWithNewlines }} />

                {/* Back to Shop Button */}
                <Button primary as={Link} to="/">Back to Shop</Button>

                {/* Back to Search Results if applicable */}
                {searchQuery && (
                    <Button as={Link} to={`/search/?q=${searchQuery}`}>Back to Search Results</Button>
                )}
            </div>
        </div>
    );
};

export default Product;
