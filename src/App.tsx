import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import CardsSection from "./components/CardsSection";
import ProductDetailsPage from "./components/ProductDetails";
import { Component } from "react";
import Layout from "./components/Layout";

class App extends Component<{}> {
  render() {
    return (
      <Router>
        <Layout>
          <Routes>
            <Route path="/" Component={CardsSection} />
            <Route path="/productDetails/:id" Component={ProductDetailsPage} />
          </Routes>
        </Layout>
      </Router>
    );
  }
}

export default App;
