import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Loader } from 'semantic-ui-react';
import { fetchProductById } from '../../../api/spring/fetchProducts';
import ProductList from '../../../components/lists/ProductList'; // Import ProductList
import "./Wishlist.css";

const Wishlist = () => {
  const wishlist = useSelector((state) => state.shop.wishlist);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWishlistProducts = async () => {
      try {
        console.log("current wishlist: " + wishlist);
        const productsData = await Promise.all(wishlist.map(fetchProductById)); // Fetch product data
        setWishlistProducts(productsData); // Store the fetched products
      } catch (error) {
        console.error('Error loading wishlist products:', error);
      } finally {
        setIsLoading(false); // Loading is complete
      }
    };

    loadWishlistProducts(); // Load products when component mounts or wishlist changes
  }, [wishlist]); // Dependency ensures re-run when wishlist changes

  if (isLoading) {
    return <Loader active inline="centered">Loading wishlist...</Loader>; // Display loading indicator
  }

  return (
    <div>
      <h1 className="wishlist-title">WISHLIST</h1>
      {wishlistProducts.length === 0 ? (
        <p>Your wishlist is empty</p> // Display when wishlist is empty
      ) : (
        <ProductList products={wishlistProducts} /> // Pass products to ProductList
      )}
    </div>
  );
};

export default Wishlist;
