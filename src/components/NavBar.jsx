import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, UserCircle } from "phosphor-react";
import { fetchCategories } from "../api/spring/fetchCategories";
import { fetchFandoms } from "../api/spring/fetchFandoms";
import "./NavBar.css";

const NavBar = () => {
  const [_, setSearchVisible] = useState(true);
  const [fandoms, setFandoms] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [searchQuery, setSearchQuery] = useState("");
  const [isNavbarVisible, setNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);

  //const navigate = useNavigate();
  const searchRef = useRef(null);

  const isUserLoggedIn = () => {
    const token = localStorage.getItem("jwtToken");
    return token !== null;
  };

  // const handleSearch = (event) => {
  //   event.preventDefault();
  //   if (searchQuery.trim() !== "") {
  //     navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  //   }
  // };

  // const handleIconClick = () => {
  //   setSearchVisible(!isSearchVisible);
  // };

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setNavbarVisible(false);
    } else {
      setNavbarVisible(true);
    }
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

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
    const handleOutsideClick = (e) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target) &&
        window.innerWidth < 800
      ) {
        setSearchVisible(false);
      }
    };

    const handleResize = () => {
      setSearchVisible(window.innerWidth > 800);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <header className={`navbar ${isNavbarVisible ? "visible" : "hidden"}`}>
      <nav>
        <ul className="nav-list">
          <div className="main-content">
            <li className="home-link">
              <Link to="/">
                <p>Curated Collectibles</p>
              </Link>
            </li>
            <li
              className="fandom-link"
              onMouseEnter={() => handleDropdownEnter("fandom")}
              onMouseLeave={() => handleDropdownLeave()}
            >
              <div className="dropdown">
                <button className="dropdown-button">SUBJECTS</button>
                {hoveredDropdown === "fandom" && (
                  <ul className="dropdown-menu">
                    {fandoms && fandoms.length > 0 ? (
                      fandoms.map((fandom) => (
                        <li key={fandom.id}>
                          <Link to={`/fandom/${fandom.id}`}>{fandom.name}</Link>
                        </li>
                      ))
                    ) : (
                      <li>No fandoms available</li>
                    )}
                  </ul>
                )}
              </div>
            </li>
            <li
              className="category-link"
              onMouseEnter={() => handleDropdownEnter("category")}
              onMouseLeave={() => handleDropdownLeave()}
            >
              <div className="dropdown">
                <button className="dropdown-button">CATEGORY</button>
                {hoveredDropdown === "category" && (
                  <ul className="dropdown-menu">
                    {categories && categories.length > 0 ? (
                      categories.map((category) => (
                        <li key={category.id}>
                          <Link to={`/category/${category.id}`}>
                            {category.name}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <li>No categories available</li>
                    )}
                  </ul>
                )}
              </div>
            </li>
            <li className="featured-link">FEATURED</li>
          </div>

          <div className="side-content">
            {/* <li>
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
                      <button type="submit">Search</button>
                    </div>
                  ) : (
                    <button type="button" onClick={handleIconClick}>
                      🔍
                    </button>
                  )}
                </div>
              </form>
            </li> */}
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
