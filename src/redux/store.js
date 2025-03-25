import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Using local storage
import authReducer from './slices/authSlice';
import shopReducer from './slices/shopSlice';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist/es/constants';

const persistConfig = {
  key: 'root', // The key for the storage
  storage,
  whitelist: ['shop', 'auth'], // Specify which slices to persist
};

const rootReducer = combineReducers({
  shop: shopReducer,
  auth: authReducer,
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
