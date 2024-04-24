import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import './Home.css';
import { useCart } from '../../context/CartContext';
import fetchProductById from '../../api/fetchProductById';

const ShoppingCart = () => {
  const { cart, toggleCartItem } = useCart();
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const loadCartProducts = async () => {
      try {
        // Fetch details of products in the cart
        const productsData = await Promise.all(cart.map(productId => fetchProductById(productId)));
        setCartProducts(productsData);
      } catch (error) {
        console.error('Error loading cart products: ', error);
      }
    };

    loadCartProducts();
  }, [cart]);

  const handleToggleCart = (event, productId) => {
    event.preventDefault();
    toggleCartItem(productId);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartProducts.length === 0 ? (
        <p>Your shopping cart is empty</p>
      ) : (
        <Grid columns={5} stackable doubling>
          {cartProducts.map((product) => (
            <Grid.Column key={product.id}>
              <div className="product">
                
                <Link to={`/products/${product.id}`}>
                  <img src={product.image.url} alt={product.name} className='product-image' />
                  <h3>{product.name}</h3>
                  <h3>{product.price.formatted_with_symbol}</h3>
                  <button className="cart-button" onClick={(e) => handleToggleCart(e, product.id)}>
                    {cart.includes(product.id) ? 'Remove from Cart' : 'Add to Cart'}
                  </button>
                </Link>
              </div>
            </Grid.Column>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default ShoppingCart;
