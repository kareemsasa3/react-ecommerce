import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true; // Set authenticated to true
      state.token = action.payload.token; // Store JWT token
      state.user = action.payload.user; // Store user data
    },
    loginFailure(state, action) {
      state.isAuthenticated = false; // Ensure the user is not authenticated
      state.token = null; // Clear the token
      state.user = null; // Clear the user data
      state.error = action.payload; // Store the error message
    },
    logout(state) {
      state.isAuthenticated = false; // Set authenticated to false
      state.token = null; // Clear JWT token
      state.user = null; // Clear user data
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions; // Export actions

export default authSlice.reducer; // Export the reducer to use in the store
