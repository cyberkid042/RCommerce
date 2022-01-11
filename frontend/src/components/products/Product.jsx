import Search from "@material-ui/icons/SearchOutlined";
import ShoppingCartOutlined from "@material-ui/icons/ShoppingCartOutlined";
import Favorite from "@material-ui/icons/FavoriteBorderOutlined";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { addProduct } from "../../store/features/cart";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 90%;
  z-index: 2;
  object-fit: fill;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      addProduct({
        ...product,
        color: product.color[0],
        size: product.size[0],
      })
    );
  };

  return (
    <Container>
      <Image />
      <Circle />
      <Image src={product.image} />
      <Info>
        <Icon onClick={() => addToCart(product)}>
          <ShoppingCartOutlined />
        </Icon>
        <Icon>
          <Link to={`/product/${product._id}`}>
            <Search style={{ textDecoration: "none", color: "black" }} />
          </Link>
        </Icon>
        <Icon>
          <Favorite />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
