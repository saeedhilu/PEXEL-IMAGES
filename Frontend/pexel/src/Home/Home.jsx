import React from "react";
import Navbar from "../Navbar/Navbar";
import ProductListing from "../Products/ProductListing";
import Footer from "../Footer/Footer";
const Home = () => {
  return (
    <div>
      <Navbar />
      <ProductListing />
      <Footer />
    </div>
  );
};

export default Home;
