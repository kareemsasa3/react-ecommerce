import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import { fetchProducts } from "../../api/spring/fetchProducts";
import ProductList from "../../components/lists/ProductList";
import SegmentListSlider from "../../components/SegmentListSlider";
import { Button } from "semantic-ui-react";
import "./Home.css";

const segmentSections = [
  {
    id: "about-us",
    title: "ABOUT US",
    text: "At Curated Collectibles, we specialize in bringing you unique items and rare finds...",
    image: "/assets/about.png",
    background: "/assets/1.jpeg",
  },
  {
    id: "our-mission",
    title: "OUR MISSION",
    text: "Our mission is to connect collectors with unique and high-quality collectibles...",
    image: "/assets/mission.png",
    background: "/assets/2.jpeg",
  },
  {
    id: "our-team",
    title: "OUR TEAM",
    text: "Our team is comprised of experienced collectors and experts in the field...",
    image: "/assets/team.png",
    background: "/assets/5.jpeg",
  },
];

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const allProducts = await fetchProducts();
        setFeaturedProducts(allProducts.slice(0, 5)); // First 5 as featured
        setNewArrivals(allProducts.slice(-5)); // Last 5 as new arrivals
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
