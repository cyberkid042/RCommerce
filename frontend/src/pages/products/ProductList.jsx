import styled from "styled-components";
import Announcement from "../../components/Announcement";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import Newsletter from "../../components/Newsletter";
import Products from "../../components/products/Products";
import { mobile } from "../../responsive";

import { useLocation } from "react-router-dom";
import { useState } from "react";

const Container = styled.div``;

const Title = styled.h2`
  margin: 18px;
  color: teal;
  font-style: italic;
  font-family: "Courier New", Courier, monospace;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;

  ${mobile({ margin: "0 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;

  ${mobile({ marginRight: "0" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;

  ${mobile({ margin: "10px 0" })}
`;

const Option = styled.option``;

const ProductList = () => {
  let location = useLocation();
  let category = location.pathname.split("/")[2];

  document.title = `Rcommerce | ${
    category
      ? "Browse through our " + category + " collection"
      : "Shop all Products"
  }`;

  const [filters, setFilter] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilter = (e) => {
    setFilter({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const sortProduct = (e) => {
    setSort(e.target.value);
  };

  return (
    <Container>
      <Announcement />
      <NavBar />
      <Title>
        {category
          ? "SHOP " + category.toUpperCase()
          : "Fashion to Get you GOING!"}
      </Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" defaultValue="1" onChange={handleFilter}>
            <Option disabled value="1">
              Color
            </Option>
            <Option value="white">White</Option>
            <Option value="black">Black</Option>
            <Option value="red">Red</Option>
            <Option value="blue">Blue</Option>
            <Option value="yellow">Yellow</Option>
            <Option value="green">Green</Option>
          </Select>
          <Select name="size" defaultValue="1" onChange={handleFilter}>
            <Option disabled value="1">
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select defaultValue="1" onChange={sortProduct}>
            <Option value="1" disabled>
              Sort
            </Option>
            <Option value="newest">Newest</Option>
            <Option value="oldest">Oldest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products category={category} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
