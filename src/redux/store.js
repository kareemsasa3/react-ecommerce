import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Using local storage
import authSlice from './slices/authSlice';
import shopSlice from './slices/shopSlice'; // Your Redux slice
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const persistConfig = {
  key: 'root', // The key for the storage
  storage,
  whitelist: ['shop', 'auth'], // Specify which slices to persist
};

const rootReducer = combineReducers({
  shop: shopSlice,
  auth: authSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore certain actions for persistence
      },
    }),
});

const persistor = persistStore(store); // Create a persistor

export { store, persistor }; // Export both store and persistor
