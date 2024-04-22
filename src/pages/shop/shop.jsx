import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header } from 'semantic-ui-react';
import './shop.css';
import fetchProducts from '../../api/fetchProducts';
import { Heart } from 'phosphor-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

const Shop = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { toggleCartItem, cart } = useCart(); // Update to useCart and destructure cart
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error loading products: ', error);
      }
    };

    loadProducts();
  }, []);

  const handleToggleWishlist = (event, productId) => {
    event.preventDefault();
    toggleWishlist(productId);
  };

  const handleToggleCart = (event, productId) => {
    event.preventDefault();
    toggleCartItem(productId);
  };

  const isProductInCart = (productId) => cart.includes(productId); // Check if product is in cart

  return (
    <div className='shop' id="products">
      <Header as='h2' textAlign='center'>All Products</Header>
      <Grid columns={5} stackable doubling>
        {products.length === 0 ? (
          <Header as='h3' textAlign='center'>Loading...</Header>
        ) : (
          products.map((product) => (
            <Grid.Column key={product.id}>
                <Link to={{
                  pathname: `/products/${product.id}`,
                  state: { productId: product.id }
                }}>
                  <div className="product">
                    <button className="wishlist-button" onClick={(e) => handleToggleWishlist(e, product.id)}>
                      <Heart 
                        size={32}
                        weight={wishlist.includes(product.id) ? "fill" : "regular"}
                      />
                    </button>
                    <img src={product.image.url} alt={product.name} className='product-image' />
                    <h3>{product.name}</h3>
                    <h3>{product.price.formatted_with_symbol}</h3>
                    <button className="cart-button" onClick={(e) => handleToggleCart(e, product.id)}>
                      {isProductInCart(product.id) ? 'Remove from Cart' : 'Add to Cart'}
                    </button>
                  </div>
              </Link>
            </Grid.Column>
          ))
        )}
      </Grid>  
    </div>
  );
};

export default Shop;
