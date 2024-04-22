import React, { createContext, useContext, useState } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    const toggleWishlist = (productId) => {
        if (wishlist.includes(productId)) {
            setWishlist((prevWishlist) => prevWishlist.filter((id) => id !== productId));
        } else {
            setWishlist((prevWishlist) => [...prevWishlist, productId]);
        }
    };

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    return useContext(WishlistContext);
};