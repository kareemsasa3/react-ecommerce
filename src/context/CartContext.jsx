import React, { createContext, useContext, useEffect, useState } from 'react';

// Create a context for Cart
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const toggleCartItem = (productId) => {
    if (cart.includes(productId)) {
      setCart(cart.filter((id) => id !== productId));
    } else {
      setCart([...cart, productId]);
    }
  };

  return (
    <CartContext.Provider value={{ cart, toggleCartItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
