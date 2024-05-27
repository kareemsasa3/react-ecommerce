import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, ShoppingCart, UserCircle } from 'phosphor-react';
import { Dropdown, Icon } from 'semantic-ui-react';
import { fetchCategories } from '../api/spring/fetchCategories';
import { fetchFandoms } from '../api/spring/fetchFandoms';
import './NavBar.css';

const NavBar = () => {
  const [isSearchVisible, setSearchVisible] = useState(true);
  const [fandoms, setFandoms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isNavbarVisible, setNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const isUserLoggedIn = () => {
    const token = localStorage.getItem('jwtToken');
    return token !== null;
  };

  const handleSearch = (event) => {
    event.preventDefault();
    console.log("Search submitted:", searchQuery);
    if (searchQuery.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleIconClick = () => {
    setSearchVisible(!isSearchVisible);
  };

  const handleOutsideClick = (e) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(e.target) &&
      window.innerWidth < 800
    ) {
      setSearchVisible(false);
    }
  };

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setNavbarVisible(false);
    } else {
      setNavbarVisible(true);
    }
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  const handleResize = () => {
    setSearchVisible(window.innerWidth > 800);
  };

  const handleDropdownEnter = (dropdown) => {
    setHoveredDropdown(dropdown);
  };

  const handleDropdownLeave = () => {
    setHoveredDropdown(null);
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };

    const loadFandoms = async () => {
      try {
        const fetchedFandoms = await fetchFandoms();
        setFandoms(fetchedFandoms);
      } catch (error) {
        console.error("Error loading fandoms:", error);
      }
    };

    loadCategories();
    loadFandoms();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousedown', handleOutsideClick); // Clean up
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleResize, handleOutsideClick, handleScroll]);

  return (
    <header className={`navbar ${isNavbarVisible ? 'visible' : 'hidden'}`}>
      <nav>
        <ul className='nav-list'>
          <div className='main-content'>
            <li className='home-link'>
              <Link to="/">
                <p>Curated Collectibles</p>
              </Link>
            </li>
            <li 
              className='fandom-link'
              onMouseEnter={() => handleDropdownEnter('fandom')}
              onMouseLeave={() => handleDropdownLeave()}
            >
              <Dropdown 
                className='no-icon-dropdown'
                text="FANDOMS"
                open={hoveredDropdown === 'fandom'}
              >
                <Dropdown.Menu>
                  {fandoms.map((fandom) => (
                    <Dropdown.Item as={Link} key={fandom.id} to={`/fandom/${fandom.id}`}>
                      {fandom.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li
              className="category-link"
              onMouseEnter={() => handleDropdownEnter('category')}
              onMouseLeave={() => handleDropdownLeave()}
            >
              <Dropdown 
                className="no-icon-dropdown"
                text='CATEGORY'
                open={hoveredDropdown === 'category'}
              >
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
                    {isSearchVisible ? (
                      <div className="ui icon input">
                        <input
                          className="prompt"
                          type="text"
                          placeholder="SEARCH"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Icon name="search" size="large" />
                      </div>
                    ): (
                      <Icon name="search" size="large" onClick={handleIconClick}/>
                    )}
                </div>
              </form>
            </li>
            <li>
              <Link to="/wishlist">
                <Heart size={32} />
              </Link>
            </li>
            <li>
              <Link to={isUserLoggedIn() ? "/account" : "/login"}>
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
