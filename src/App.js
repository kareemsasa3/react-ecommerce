import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/shop/Home';
import CategoryList from './components/CategoryList';
import Cart from './pages/shop/ShoppingCart';
import Product from './pages/shop/Product';
import Wishlist from './pages/shop/Wishlist';
import SearchPage from './pages/shop/SearchPage';
import Login from './components/Login';

function App() {
  return (
    <div className='App'>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element={<CategoryList />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;