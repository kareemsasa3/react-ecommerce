import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Heart } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
  addToCart,
  removeFromCart,
} from "../../redux/slices/shopSlice";
import "./ProductList.css";
import LoadingScreen from "../../util/LoadingScreen";

const ProductList = ({ products }) => {
  const [isLoading, setIsLoading] = useState(products.length === 0);
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

  useEffect(() => {
    if (products.length > 0) {
      setIsLoading(false);
    }
  }, [products]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (products.length === 0) {
    return <div className="no-products">No products found.</div>;
  }

  return (
    <div className="product-list">
      <Grid columns={5} stackable doubling>
        {products.map((product) => (
          <Grid.Column key={product.id}>
            <Link to={`/products/${product.id}`} className="product-link">
              <div className="product">
                <img
                  src={product.imageUrl || "no_image_available.jpeg"}
                  alt={product.name || "No Name"}
                  className="product-image"
                />
                <div className="product-description">
                  <h3>{product.description}</h3>
                  <button
                    className="wishlist-button"
                    onClick={(e) => handleWishlist(e, product.id)}
                  >
                    <Heart
                      size={32}
                      weight={
                        isProductInWishlist(product.id) ? "fill" : "regular"
                      }
                    />
                  </button>
                </div>
                <div className="product-info">
                  <h2 className="product-name">{product.name}</h2>
                </div>
                <p className="product-price">$ {product.price || "N/A"}</p>
                <button
                  className="cart-button"
                  onClick={(e) => handleCart(e, product.id)}
                >
                  {isProductInCart(product.id)
                    ? "Remove from Cart"
                    : "Add to Cart"}
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
