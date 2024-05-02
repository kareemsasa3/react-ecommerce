import React, { useEffect, useState } from 'react';
import fetchProducts from '../../api/fetchProducts';
import ProductList from '../../components/ProductList';
import SegmentListSlider from '../../components/SegmentListSlider';
import './Home.css';

const segmentSections = [
  {
    title: 'ABOUT US',
    text: "At Curated Collectibles, we specialize in bringing you unique items and rare finds...",
    image: '/assets/about.png',
  },
  {
    title: 'OUR MISSION',
    text: "Our mission is to connect collectors with unique and high-quality collectibles...",
    image: '/assets/mission.png',
  },
  {
    title: 'OUR TEAM',
    text: "Our team is comprised of experienced collectors and experts in the field...",
    image: '/assets/team.png',
  },
];

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const allProducts = await fetchProducts();
        setFeaturedProducts(allProducts.slice(0, 5)); // First 5 as featured
        setNewArrivals(allProducts.slice(-5)); // Last 5 as new arrivals
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    loadProducts(); // Fetch products on component mount
  }, []); // Only run once on component mount

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to Curated Collectibles</h1>
        <p>Your one-stop shop for unique items and collectibles.</p>
      </div>
      <SegmentListSlider segments={segmentSections} /> {/* Use the new component */}
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
