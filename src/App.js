import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/shop/Home';
import CategoryList from './pages/shop/CategoryList';
import Cart from './pages/shop/ShoppingCart';
import Product from './pages/shop/Product';
import Wishlist from './pages/shop/Wishlist';
import SearchPage from './pages/shop/SearchPage';
import Login from './components/Login';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <div className='App'>
          <Router>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:categoryName" element={<CategoryList />} />
              <Route path="/products/:id" element={<Product />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </Router>
        </div>
      </CartProvider>
    </WishlistProvider>
  );
}

export default App;