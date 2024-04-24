import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { Heart } from 'phosphor-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import "./ProductList.css";

const ProductList = ({ products }) => {
  const { wishlist, toggleWishlist } = useWishlist(); // Get wishlist functions from context
  const { cart, toggleCartItem } = useCart(); // Get cart functions from context

  const isProductInWishlist = (productId) => wishlist.includes(productId); // Check if product is in wishlist
  const isProductInCart = (productId) => cart.includes(productId); // Check if product is in cart

  const handleToggleWishlist = (e, productId) => {
    e.preventDefault();
    toggleWishlist(productId); // Toggle wishlist status for the product
  };

  const handleToggleCart = (e, productId) => {
    e.preventDefault();
    toggleCartItem(productId); // Toggle cart status for the product
  };

  return (
    <Grid columns={3} stackable doubling>
      {products.map((product) => (
        <Grid.Column key={product.id}>
          <Link to={`/products/${product.id}`}>
            <div className="product">
              <button
                className="wishlist-button"
                onClick={(e) => handleToggleWishlist(e, product.id)} // Wishlist toggle
              >
                <Heart
                  size={32}
                  weight={isProductInWishlist(product.id) ? 'fill' : 'regular'} // Icon change based on status
                />
              </button>
              <img src={product.image.url} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <h3>{product.price.formatted_with_symbol}</h3>
              <button
                className="cart-button"
                onClick={(e) => handleToggleCart(e, product.id)} // Cart toggle
              >
                {isProductInCart(product.id) ? 'Remove from Cart' : 'Add to Cart'}
              </button>
            </div>
          </Link>
        </Grid.Column>
      ))}
    </Grid>
  );
};

export default ProductList;
