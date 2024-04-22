import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import './shop.css';
import { useWishlist } from '../../context/WishlistContext';
import fetchProductById from '../../api/fetchProductById';
import { Heart } from 'phosphor-react';

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    const loadWishlistProducts = async () => {
      try {
        // Fetch details of products in the wishlist
        const productsData = await Promise.all(wishlist.map(productId => fetchProductById(productId)));
        setWishlistProducts(productsData);
      } catch (error) {
        console.error('Error loading wishlist products: ', error);
      }
    };

    loadWishlistProducts();
  }, [wishlist]);

  const handleToggleWishlist = (productId) => {
    toggleWishlist(productId);
  };

  return (
    <div>
      <h2>Wishlist</h2>
      {wishlistProducts.length === 0 ? (
        <p>Your wishlist is empty</p>
      ) : (
        <Grid columns={5} stackable doubling>
          {wishlistProducts.map((product) => (
            <Grid.Column key={product.id}>
              <div className="product">
                <button className="wishlist-button" onClick={() => handleToggleWishlist(product.id)}>
                  <Heart 
                    size={32}
                    weight={wishlist.includes(product.id) ? "fill" : "regular"}
                  />
                </button>
                <Link to={`/products/${product.id}`}>
                  <img src={product.image.url} alt={product.name} className='product-image' />
                  <h3>{product.name}</h3>
                  <h3>{product.price.formatted_with_symbol}</h3>
                </Link>
              </div>
            </Grid.Column>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Wishlist;
