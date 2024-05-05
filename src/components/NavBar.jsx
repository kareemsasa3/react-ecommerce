import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, ShoppingCart, UserCircle } from 'phosphor-react';
import { Dropdown } from 'semantic-ui-react';
import { fetchCategories } from '../api/spring/fetchCategories';
import './NavBar.css';

const NavBar = () => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isNavbarVisible, setNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  // Load categories from the API
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };

    loadCategories(); // Load categories initially
  }, []);

  // Handle search query and navigate
  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Handle scroll event to toggle navbar visibility
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY; // Current scroll position
    if (currentScrollY > lastScrollY && currentScrollY > 100) { // Scrolling down, hide navbar
      setNavbarVisible(false);
    } else { // Scrolling up, show navbar
      setNavbarVisible(true);
    }
    setLastScrollY(currentScrollY); // Update last scroll position
  }, [lastScrollY]);

  // Add or remove scroll event listener based on dependency
  useEffect(() => {
    window.addEventListener('scroll', handleScroll); // Add event listener
    return () => {
      window.removeEventListener('scroll', handleScroll); // Cleanup on unmount
    };
  }, [handleScroll]); // Re-run when handleScroll changes

  return (
    <header className={`navbar ${isNavbarVisible ? 'visible' : 'hidden'}`}> {/* Toggle visibility */}
      <nav>
        <ul className='nav-list'>
          <div className='main-content'>
            <li className='home-link'>
              <Link to="/">
                <h1>Curated Collectibles</h1> {/* Company name or logo */}
              </Link>
            </li>
            <li className="category-link">
              <Dropdown text='CATEGORY' icon='angle down'>
                <Dropdown.Menu>
                  {categories.map((category) => (
                    <Dropdown.Item as={Link} key={category.id} to={`/category/${category.id}`}>
                      {category.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li className='featured-link'>FEATURED</li>
          </div>

          <div className='side-content'>
            <li>
              <form onSubmit={handleSearch}>
                <div className="ui search">
                  <div className="ui icon input">
                    <input
                      className="prompt"
                      type="text"
                      placeholder="SEARCH"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <i className="search icon"></i>
                  </div>
                </div>
              </form>
            </li>
            <li>
              <Link to="/wishlist">
                <Heart size={32} />
              </Link>
            </li>
            <li>
              <Link to="/login">
                <UserCircle size={32} />
              </Link>
            </li>
            <li>
              <Link to="/cart">
                <ShoppingCart size={32} />
              </Link>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
