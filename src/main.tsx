import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/client.ts";
import App from "./App.tsx";
import "./index.css";
import { SelectedCategoryProvider } from "./context/SelectedCategoryContext.tsx";
import { CartProvider } from "./context/CartContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <SelectedCategoryProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </SelectedCategoryProvider>
    </ApolloProvider>
  </React.StrictMode>
);
