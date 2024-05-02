import React, { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Heart } from 'phosphor-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToWishlist,
  removeFromWishlist,
  addToCart,
  removeFromCart,
} from '../redux/shopSlice';
import './ProductList.css';
import LoadingScreen from '../util/LoadingScreen'; // Loading screen component

const parseHTMLString = (htmlString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  return doc.body.textContent || '';
};

const ProductList = ({ products }) => {
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.shop.wishlist);
  const cart = useSelector((state) => state.shop.cart);

  const isProductInWishlist = (productId) => wishlist.includes(productId);
  const isProductInCart = (productId) => cart.includes(productId);

  const handleWishlist = (e, productId) => {
    e.preventDefault();
    if (isProductInWishlist(productId)) {
      dispatch(removeFromWishlist(productId));
    } else {
      dispatch(addToWishlist(productId));
    }
  };

  const handleCart = (e, productId) => {
    e.preventDefault();
    if (isProductInCart(productId)) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(addToCart(productId));
    }
  };

  // Use effect to simulate loading or wait until data is ready
  useEffect(() => {
    // Simulate a delay or wait until products are loaded
    if (products.length > 0) {
      setIsLoading(false); // Data is loaded
    }
  }, [products]); // Re-run when products change

  if (isLoading) {
    return <LoadingScreen />; // Render loading screen while loading
  }

  return (
    <div className="product-list">
      <Grid columns={5} stackable doubling>
        {products.map((product) => (
          <Grid.Column key={product.id}>
            <Link to={`/products/${product.id}`}>
              <div className="product">
                <img src={product.image.url} alt={product.name} className="product-image" />
                <div className="product-description">
                  <h3>
                    {parseHTMLString(product.description)}
                  </h3>
                  <button
                    className="wishlist-button"
                    onClick={(e) => handleWishlist(e, product.id)}
                  >
                    <Heart
                      size={32}
                      weight={isProductInWishlist(product.id) ? 'fill' : 'regular'}
                    />
                  </button>
                </div>
                <div className="product-info">
                  <h2 className="product-name">{product.name}</h2>
                </div>
                <p>{product.price.formatted_with_symbol}</p>
                <button
                  className="cart-button"
                  onClick={(e) => handleCart(e, product.id)}
                >
                  {isProductInCart(product.id) ? 'Remove from Cart' : 'Add to Cart'}
                </button>
              </div>
            </Link>
          </Grid.Column>
        ))}
      </Grid>
    </div>
  );
};

export default ProductList;
