import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Loader, Button, Message } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { fetchProductById } from '../../api/spring/fetchProducts';
import { removeFromCart } from '../../redux/shopSlice';
import CartItems from '../../components/CartItems';
import Summary from '../../components/Summary';
import MostCommonCategory from '../../components/MostCommonCategory';
import './ShoppingCart.css';

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.shop.cart);

  const [cartProducts, setCartProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleContinueShopping = () => {
    navigate('/'); // Navigate back to the home page
  };

  // Load cart products when the cart changes
  useEffect(() => {
    const loadCartProducts = async () => {
      setIsLoading(true);
      try {
        if (cart.length === 0) {
          console.log('Cart is empty.');
          setCartProducts([]);
          setIsLoading(false);
          return; // Early return if cart is empty
        }

        const productsData = await Promise.all(
          cart.map((productId) => fetchProductById(productId))
        );

        setCartProducts(productsData);
        setError(null); // Reset error state
      } catch (error) {
        console.error('Error loading cart products:', error);
        setError('Failed to load cart products');
      } finally {
        setIsLoading(false); // End loading state
      }
    };

    loadCartProducts(); // Fetch cart products when the cart changes
  }, [cart]);

  if (isLoading) {
    return <Loader active inline="centered">Loading cart...</Loader>; // Display loading
  }

  if (error) {
    return <Message negative>{error}</Message>; // Display error message
  }

  const itemCount = cartProducts.length;

  return (
    <div className="shopping-cart">
      <h1 className="my-cart">My Cart</h1>
      {cartProducts.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty.</h2>
          <Button onClick={handleContinueShopping}>Continue Shopping</Button>
        </div>
      ) : (
        <Grid columns={2} stackable>
          <Grid.Column width={10}>
            <CartItems cartProducts={cartProducts} removeFromCart={(id) => dispatch(removeFromCart(id))} />
          </Grid.Column>
          <Grid.Column width={6}>
            <Summary itemCount={itemCount} cartProducts={cartProducts} />
          </Grid.Column>
        </Grid>
      )}
      <div className="similar-products">
        <h2>YOU MAY ALSO LIKE</h2>
        <MostCommonCategory /> {/* Display recommendations */}
      </div>
    </div>
  );
};

export default ShoppingCart;
