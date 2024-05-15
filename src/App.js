import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/shop/Home';
import CategoryList from './components/CategoryList';
import FandomList from './components/FandomList';
import Cart from './pages/shop/ShoppingCart';
import Product from './pages/shop/Product';
import Wishlist from './pages/shop/Wishlist';
import SearchPage from './pages/shop/SearchPage';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import Account from './pages/shop/Account';
import ForgotPassword from './pages/shop/ForgotPassword';
import "./App.css";

function App() {
  return (
    <div className='App'>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element={<CategoryList />} />
          <Route path="/fandom/:fandomId" element={<FandomList />}/>
          <Route path="/products/:id" element={<Product />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/profile" />
          <Route path="/addressbook" />
          <Route path="/saved-payments" />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;