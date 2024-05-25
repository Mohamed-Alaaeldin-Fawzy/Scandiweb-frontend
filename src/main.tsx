import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/client.ts";
import App from "./App.tsx";
import "./index.css";
import { CategoryProvider } from "./context/CategoryContext.tsx";
import { ProductProvider } from "./context/ProductContext.tsx";
import { CartProvider } from "./context/CartContext.tsx";
import { ToastProvider } from "./context/ToasterContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <CategoryProvider>
        <ProductProvider>
          <CartProvider>
            <ToastProvider>
              <App />
            </ToastProvider>
          </CartProvider>
        </ProductProvider>
      </CategoryProvider>
    </ApolloProvider>
  </React.StrictMode>
);
