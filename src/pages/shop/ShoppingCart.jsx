import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Loader, Button, Message } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { fetchProductById } from '../../api/spring/fetchProductById'; // Function to fetch product by ID
import ProductList from '../../components/ProductList';
import { removeFromCart } from '../../redux/shopSlice'; // Redux action to remove from cart
import './ShoppingCart.css';

const ShoppingCart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.shop.cart); // Get cart IDs from Redux

    const [cartProducts, setCartProducts] = useState([]); // Store fetched products
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch cart products from the Spring backend
    useEffect(() => {
        const loadCartProducts = async () => {
            setIsLoading(true);
            console.log("current cart: " + cart);
            try {
                const productsData = await Promise.all(
                    cart.map((productId) => fetchProductById(productId))
                ); // Fetch products by their IDs
                setCartProducts(productsData); // Store fetched products
            } catch (error) {
                console.error('Error loading cart products:', error);
                setError('Failed to load cart products'); // Set error message
            } finally {
                setIsLoading(false); // Loading complete
            }
        };

        loadCartProducts(); // Fetch products when cart changes
    }, [cart]); // Re-run when cart changes

    const handleContinueShopping = () => {
        navigate('/'); // Redirects to home page
    };

    if (isLoading) { // Display loading screen while fetching
        return <Loader active inline="centered">Loading cart...</Loader>;
    }

    if (error) { // Handle error scenario
        return <Message negative>{error}</Message>; // Display error message
    }

    if (cartProducts.length === 0) { // Handle empty cart
        return (
            <div className="empty-cart">
                <h2>Your cart is empty.</h2>
                <Button onClick={handleContinueShopping} className="continue-shopping">Continue Shopping</Button>
            </div>
        );
    }

    return (
        <div className="shopping-cart">
            <h1 className="my-cart">My Cart</h1>
            <Grid columns={2} stackable>
                <Grid.Column width={10}> {/* Cart items */}
                    <ProductList products={cartProducts} /> {/* Display the list of products */}
                </Grid.Column>
                <Grid.Column width={6}> {/* Summary */}
                    {/* Add a summary component with cart information */}
                    <Button onClick={() => dispatch(removeFromCart(cartProducts[0].id))}>Remove First Product</Button>
                </Grid.Column>
            </Grid>
        </div>
    );
};

export default ShoppingCart;
