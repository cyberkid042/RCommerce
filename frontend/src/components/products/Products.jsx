import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import styled from "styled-components";
import Product from "./Product";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow-x: hidden;
`;

const Products = ({ filters, category, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setfilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          category
            ? `http://localhost:5000/api/product/shopallproducts?category=${category}`
            : "http://localhost:5000/api/product/shopallproducts"
        );
        setProducts(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, [category]);

  useEffect(() => {
    category &&
      setfilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, category, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setfilteredProducts((previous) =>
        [...previous].sort((a, b) => a.createdAt - b.createdAt)
      );
    }
    if (sort === "oldest") {
      setfilteredProducts((previous) =>
        [...previous].sort((a, b) => a.createdAt - b.createdAt).reverse()
      );
    } else if (sort === "asc") {
      setfilteredProducts((previous) =>
        [...previous].sort((a, b) => a.price - b.price)
      );
    } else {
      setfilteredProducts((previous) =>
        [...previous].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {loading ? (
        <div style={{ marginLeft: "auto", marginRight: "auto" }}>
          <CircularProgress style={{ color: "teal" }} />
        </div>
      ) : category ? (
        filteredProducts.map((product) => (
          <Product product={product} key={product._id} />
        ))
      ) : (
        products
          .slice(0, 8)
          .map((product) => <Product product={product} key={product._id} />)
      )}
    </Container>
  );
};

export default Products;

// {
//   (() => {
//     if (loading) {
//       console.log(loading);
//     } else {
//       if (category) {
//         filteredProducts.map((product) => (
//           <Product product={product} key={product._id} />
//         ));
//       } else {
//         products
//           .slice(0, 8)
//           .map((product) => <Product product={product} key={product._id} />);
//       }
//     }
//   })();
// }
