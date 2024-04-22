import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const toggleCartItem = (productId) => {
    if (cart.includes(productId)) {
      setCart((prevCart) => prevCart.filter((id) => id !== productId));
    } else {
      setCart((prevCart) => [...prevCart, productId]);
    }
  };

  return (
    <CartContext.Provider value={{ cart, toggleCartItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
