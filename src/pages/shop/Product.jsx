import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { Heart } from 'phosphor-react';
import { fetchProductById } from '../../api/spring/fetchProducts';
import LoadingScreen from '../../util/LoadingScreen';
import "./Product.css";
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../redux/slices/shopSlice';

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null); // Initial state is null
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const dispatch = useDispatch();
    const wishlist = useSelector(state => state.shop.wishlist);

    const isProductInWishlist = (productId) => wishlist.includes(productId);

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

        loadProductById();
    }, [id]);

    const handleWishlistClick = () => {
        if (isProductInWishlist(id)) {
            dispatch(removeFromWishlist(id));
        } else {
            dispatch(addToWishlist(id));
        }
    };    

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (product === null) {
        return <p>Product information is currently unavailable.</p>;
    }

    const { name, price, description, imageUrl } = product;

    return (
        <div className="product">
            <div className='product-image-container'>
                {imageUrl && <img src={imageUrl} alt={name} />}
                <button
                    className={`wishlist-button ${isProductInWishlist(id) ? 'selected' : ''}`}
                    onClick={handleWishlistClick}
                  >
                    <Heart
                      size={48}
                      weight={isProductInWishlist(id) ? 'fill' : 'regular'}
                    />
                  </button>
            </div>
            <div className='product-title'>
                <h2>{description}</h2>
                <h1>{name}</h1>
            </div>
            <div className='description'>
                
                <h4>${price}</h4>
                
                <Button primary as={Link} to="/">Back to Shop</Button>
            </div>
        </div>
    );
};

export default Product;
