import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, UserCircle } from 'phosphor-react';
import { Dropdown } from 'semantic-ui-react';
import fetchCategories from '../api/fetchCategories';
import "./NavBar.css";

const NavBar = () => {
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // To capture search input
    const navigate = useNavigate(); // Hook to navigate to a different route

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const fetchedCategories = await fetchCategories();
                setCategories(fetchedCategories);
            } catch (error) {
                console.error("Error loading categories in NavBar: ", error);
            }
        };

        loadCategories();
    }, []); 

    const handleSearch = (event) => {
        event.preventDefault();
        if (searchQuery.trim() !== "") {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`); // Navigate to the search page with the search query
        }
    };

    return (
        <div className='navbar'>
            <header>
                <nav>
                    <ul className='nav-list'>
                        <div className='main-content'>
                            <li className='home-link'>
                                <Link to="/"><h1>Curated Collectibles</h1></Link>
                            </li>
                            <li className="category-link">
                                <Dropdown text='CATEGORY' icon='angle down'>
                                    <Dropdown.Menu>
                                        {categories.map(category => (
                                            <Dropdown.Item as={Link} key={category.name} to={`/category/${category.slug}`}>
                                                {category.name}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>
                            <li className='featured-link'>
                                FEATURED
                            </li>
                        </div>
                        <div className='side-content'>
                            <li>
                                <form onSubmit={handleSearch}> {/* Handle form submission for search */}
                                    <div className="ui search">
                                        <div className="ui icon input">
                                            <input
                                                className="prompt"
                                                type="text"
                                                placeholder="SEARCH"
                                                value={searchQuery} // Bind the input value to state
                                                onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
                                            />
                                            <i className="search icon"></i>
                                        </div>
                                    </div>
                                </form>
                            </li>
                            <li>
                                <Link to="/wishlist"><Heart size={32} /></Link>
                            </li>
                            <li>
                                <Link to="/login"><UserCircle size={32} /></Link>
                            </li>
                            <li>
                                <Link to="/cart"><ShoppingCart size={32} /></Link>
                            </li>
                        </div>
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default NavBar;
