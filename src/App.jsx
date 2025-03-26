import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/shop/Home';
import CategoryList from './components/lists/CategoryList';
import FandomList from './components/lists/FandomList';
import ShoppingCart from './pages/shop/account/ShoppingCart';
import Product from './pages/shop/Product';
import Wishlist from './pages/shop/account/Wishlist';
import SearchPage from './pages/shop/SearchPage';
import Login from './pages/shop/login/Login';
import CreateAccount from './pages/shop/login/CreateAccount';
import CreateAddress from './pages/shop/account/CreateAddress';
import Account from './pages/shop/account/Account';
import AddressBook from './components/account/AddressBook';
import ForgotPassword from './pages/shop/login/ForgotPassword';
import ProtectedRoute from './util/ProtectedRoute';
import { useSelector } from 'react-redux';
import './App.css';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className='App'>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element={<CategoryList />} />
          <Route path="/fandom/:fandomId" element={<FandomList />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/account" element={isAuthenticated ? <Account /> : <Login />} />
          <Route path="/profile" />
          <Route
            path="/addressbook"
            element={<ProtectedRoute element={<AddressBook />} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/addressbook/new"
            element={<ProtectedRoute element={<CreateAddress />} isAuthenticated={isAuthenticated} />}
          />
          <Route path="/saved-payments" />
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Home />} />
          <Route path="/create-account" element={!isAuthenticated ? <CreateAccount /> : <Home />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<ShoppingCart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
