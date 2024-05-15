import { createSlice } from '@reduxjs/toolkit';

// Initial state of the slice
const initialState = {
    wishlist: [],
    cart: [], // Use an array to store product objects or IDs
};

const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            const productId = action.payload; // Assume action payload contains the product ID
            if (!state.wishlist.includes(productId)) {
                state.wishlist.push(productId); // Add to wishlist if not already present
            }
        },
        removeFromWishlist: (state, action) => {
            const productId = action.payload;
            state.wishlist = state.wishlist.filter((id) => id !== productId); // Remove from wishlist
        },
        resetWishlist: (state) => {
          state.wishlist = [];
        },
        addToCart: (state, action) => {
            const productId = action.payload;
            if (!state.cart.includes(productId)) {
                state.cart.push(productId); // Add to cart if not already present
            }
        },
        removeFromCart: (state, action) => {
            const productId = action.payload;
            state.cart = state.cart.filter((id) => id !== productId); // Remove from cart by ID
        },
        resetCart: (state) => {
          state.cart = [];
        },
    },
});

export const {
    addToWishlist,
    removeFromWishlist,
    resetWishlist,
    addToCart,
    removeFromCart,
    resetCart,
} = shopSlice.actions;

export default shopSlice.reducer;
