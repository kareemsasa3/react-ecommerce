import React, { useEffect, useState } from "react";
import { fetchProducts } from "../../api/spring/fetchProducts";
import ProductList from "../../components/lists/ProductList";
import "./Home.css";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const allProducts = await fetchProducts();
        setFeaturedProducts(allProducts.slice(0, 5));
        setNewArrivals(allProducts.slice(-5));
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts(); // Fetch products on component mount
  }, []); // Only run once on component mount

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to Curated Collectibles</h1>
        <p>Your one-stop shop for unique items and collectibles.</p>
        {/* <div>
          {isAuthenticated ? (
            <div>
              <p>Welcome, {user.firstName}!</p>
              <Button onClick={handleLogout}>Log Out</Button>
            </div>
          ) : (
            <div>
              <p>You are not logged in!</p>
              <Button onClick={handleLogin}>Log In</Button>
            </div>
          )}
        </div> */}
      </div>
      {/* <SegmentListSlider segments={segmentSections} /> Use the new component */}
      <section className="featured-products">
        <h2 className="featured-title">FEATURED</h2>
        <ProductList products={featuredProducts} />
      </section>
      <section className="new-arrivals">
        <h2 className="new-arrivals-title">NEW ARRIVALS</h2>
        <ProductList products={newArrivals} />
      </section>
    </div>
  );
};

export default Home;
