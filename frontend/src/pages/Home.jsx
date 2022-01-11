import React, { useEffect } from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/categories/Categories";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Newsletter from "../components/Newsletter";
import Products from "../components/products/Products";
import Slider from "../components/Slider";

const Home = () => {
  useEffect(() => {
    document.title = "React Ecommerce Store ";
  }, []);
  return (
    <div>
      <Announcement />
      <NavBar />
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
