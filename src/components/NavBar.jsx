import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, UserCircle } from 'phosphor-react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react'; // Import Dropdown from Semantic UI React
import "./NavBar.css";
import Commerce from '@chec/commerce.js';

function NavBar() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const commerce = new Commerce('pk_test_5679231f0e50d09e47c1f7773673522a983eddfbb0303', true);

        const fetchCategories = async () => {
            try {
                const { data: categories } = await commerce.categories.list();
                setCategories(categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    console.log(categories);

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
                                <div className="ui search">
                                    <div className="ui icon input">
                                        <input className="prompt" type="text" placeholder="SEARCH" />
                                        <i className="search icon"></i>
                                    </div>
                                    <div className="results"></div>
                                </div>
                            </li>
                            <li>
                                <Link to="/wishlist"><Heart size={32} /></Link>
                            </li>
                            <li>
                                <Link to="/login"><UserCircle size={32} /></Link>
                            </li>
                            <li>
                                <Link to="/cart"><ShoppingCart size={32}/></Link>
                            </li>
                        </div>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default NavBar;
