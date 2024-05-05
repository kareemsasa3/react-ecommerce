import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header, Button } from 'semantic-ui-react'; // Import Loader for loading indication
import { fetchProductById } from '../../api/spring/fetchProductById';
import LoadingScreen from '../../util/LoadingScreen';

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null); // Initial state is null
    const [isLoading, setIsLoading] = useState(true); // Loading state

    useEffect(() => {
        const loadProductById = async () => {
            try {
                const productData = await fetchProductById(id); // Fetch product data
                setProduct(productData); // Set product data
            } catch (error) {
                console.error('Error loading product:', error); // Handle error
            } finally {
                setIsLoading(false); // End loading state once fetch is complete
            }
        };

        loadProductById(); // Fetch data on component mount or ID change
    }, [id]); // Dependency on id

    // If still loading, render the loading screen
    if (isLoading) {
        return <LoadingScreen />;
    }

    // If product is null, return a suitable message or alternative content
    if (product === null) {
        return <p>Product information is currently unavailable.</p>;
    }

    const { name, price, description, image } = product; // Safe destructuring after null check
    const descriptionWithNewlines = description.replace(/<\/p>/g, '<br> ');

    return (
        <div className="product">
            <Header as='h2' textAlign='center'>{name}</Header> {/* Product name */}
            {image && <img src={image.url} alt={name} />} {/* Display image only if available */}
            <div className='description'>
                <h3>{name}</h3> {/* Display product name */}
                <h4>{price.formatted_with_symbol}</h4> {/* Display product price */}
                <p dangerouslySetInnerHTML={{ __html: descriptionWithNewlines }} /> {/* Product description */}
                <Button primary as={Link} to="/">Back to Shop</Button> {/* Back to shop button */}
            </div>
        </div>
    );
};

export default Product;
