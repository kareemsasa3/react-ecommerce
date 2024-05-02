import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Loader, Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import fetchProductById from '../../api/fetchProductById';
import fetchProducts from '../../api/fetchProducts';
import Summary from '../../components/Summary';
import CartItems from '../../components/CartItems';
import Recommendations from '../../components/Recommendations';
import { removeFromCart } from '../../redux/shopSlice';
import './ShoppingCart.css';

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.shop.cart); // Track cart from Redux

  const [cartProducts, setCartProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch cart products whenever the cart changes
  useEffect(() => {
    const loadCartProducts = async () => {
      setIsLoading(true); // Start loading
      try {
        const productsData = await Promise.all(cart.map(fetchProductById)); // Fetch cart products
        setCartProducts(productsData); // Store fetched products
      } catch (error) {
        console.error('Error loading cart products:', error);
      } finally {
        setIsLoading(false); // End loading
      }
    };

    loadCartProducts(); // Fetch when cart changes
  }, [cart]); // Dependency ensures re-run on cart change

  // Fetch all products initially
  useEffect(() => {
    const loadAllProducts = async () => {
      try {
        const allProducts = await fetchProducts(); // Fetch all products
        setAllProducts(allProducts); // Store all products
      } catch (error) {
        console.error('Error fetching all products:', error);
      }
    };

    loadAllProducts(); // Run once on component mount
  }, []); // No dependencies ensures it runs only once

  useEffect(() => {
    if (allProducts.length > 0) {
      const nonCartProducts = allProducts.filter(
        (product) => !cart.includes(product.id) // Exclude cart products
      );
      setSimilarProducts(nonCartProducts.slice(0, 5)); // Limit to 5 similar products
    }
  }, [allProducts, cart]); // Dependency on all products and cart to ensure updates

  const handleContinueShopping = () => {
    navigate('/'); // Redirects to home
  };

  if (isLoading) {
    return <Loader active inline="centered">Loading cart...</Loader>; // Display loading when needed
  }

  return (
    <div className="shopping-cart">
      <h1 className="my-cart">MY CART</h1> {/* Main header */}
      {cartProducts.length === 0 ? (
        <div className="empty-cart">
          <h2>YOUR CART IS EMPTY</h2>
          <Button onClick={handleContinueShopping} className="continue-shopping">CONTINUE SHOPPING</Button>  
        </div>
      ) : (
        <Grid columns={2} stackable>
          <Grid.Column width={10}> {/* Cart items */}
            <CartItems cartProducts={cartProducts} removeFromCart={(id) => dispatch(removeFromCart(id))} />
          </Grid.Column>

          <Grid.Column width={6}> {/* Summary */}
            <Summary itemCount={cartProducts.length} cartProducts={cartProducts} />
          </Grid.Column>
        </Grid>
      )}

      <Recommendations similarProducts={similarProducts} /> {/* Recommendations */}
    </div>
  );
};

export default ShoppingCart;
