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
import LoadingScreen from '../util/LoadingScreen';

const parseHTMLString = (htmlString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  return doc.body.textContent || '';
};

const ProductList = ({ products = [] }) => {
  const [isLoading, setIsLoading] = useState(products.length === 0);
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.shop.wishlist);
  const cart = useSelector((state) => state.shop.cart);

  const isProductInWishlist = (productId) => wishlist.includes(productId);
  const isProductInCart = (productId) => cart.includes(productId);

  const handleWishlist = (e, productId) => {
    e.preventDefault();
    if (isProductInWishlist(productId)) {
      console.log("Removing " + productId + " from the wishlist.");
      dispatch(removeFromWishlist(productId));
    } else {
      console.log("Adding " + productId + " to the wishlist.");
      dispatch(addToWishlist(productId));
    }
  };

  const handleCart = (e, productId) => {
    e.preventDefault();
    if (isProductInCart(productId)) {
      console.log("Removing " + productId + " from the shopping cart.");
      dispatch(removeFromCart(productId));
    } else {
      console.log("Adding " + productId + " to the shopping cart.");
      dispatch(addToCart(productId));
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      setIsLoading(false);
    }
  }, [products]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (products.length === 0) {
    return <div>No products found.</div>;
  }

  return (
    <div className="product-list">
      <Grid columns={5} stackable doubling>
        {products.map((product) => (
          <Grid.Column key={product.id}>
            <Link to={`/products/${product.id}`}>
              <div className="product">
                <img
                  src={product.imageUrl || 'no_image_available.jpeg'}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-description">
                  <h3>{parseHTMLString(product.description)}</h3>
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
                <p>$ {product.price || 'N/A'}</p>
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
