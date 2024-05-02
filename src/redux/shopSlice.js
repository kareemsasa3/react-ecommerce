import { createSlice } from '@reduxjs/toolkit';

// Initial state of the slice
const initialState = {
  wishlist: [],
  cart: [],
};

// Redux slice with builder callback notation
const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      if (!state.wishlist.includes(action.payload)) {
        state.wishlist.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter((id) => id !== action.payload);
    },
    addToCart: (state, action) => {
      if (!state.cart.includes(action.payload)) {
        state.cart.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((id) => id !== action.payload);
    },
  },
});

export const { 
  addToWishlist, 
  removeFromWishlist, 
  addToCart, 
  removeFromCart, 
} = shopSlice.actions;

export default shopSlice.reducer;
