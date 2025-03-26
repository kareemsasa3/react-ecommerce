import React from "react";
import { createRoot } from "react-dom/client"; // Correct import for React 18's createRoot
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store"; // Redux store and persistor
import App from "./App"; // Main App component
import "semantic-ui-css/semantic.min.css"; // Ensure the correct import

// Get the root DOM element
const rootElement = document.getElementById("root");

// Create a root with React 18's createRoot
const root = createRoot(rootElement); // Correct usage

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
