import styled from "styled-components";
import Announcement from "../../components/Announcement";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import Newsletter from "../../components/Newsletter";

import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { mobile } from "../../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { IconButton } from "@material-ui/core";
import Alert from "@mui/material/Alert";
import { addProduct } from "../../store/features/cart";

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  padding: 50px;

  ${mobile({ flexDirection: "column", padding: "10px" })}
`;

const ImageContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 80vh;
  object-fit: cover;

  ${mobile({ height: "45vh" })}
`;

//right side

const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;

  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const ProductDescription = styled.p`
  margin: 20px 0;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0;
  display: flex;
  justify-content: space-between;

  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0 5px;
  cursor: pointer;
`;

const FIlterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

const AddToCartButton = styled.button`
  cursor: pointer;
  padding: 15px;
  border: 4px solid teal;
  background-color: white;
  font-weight: 500;
  transition: all 0.5s ease;

  &:hover {
    background-color: teal;
    color: white;
  }
`;

const SingleProduct = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];

  //call redux dispatch Action
  const dispatch = useDispatch();

  //state for products
  const [product, setProduct] = useState({});

  //set order quantity
  let [quantity, setQuantity] = useState(1);

  //state for selected size and color
  let [size, setSize] = useState("");
  let [color, setColor] = useState("");

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/product/shop/${productId}`
        );
        setProduct(response.data);
        setSize(response.data.size[0]);
        setColor(response.data.color[0]);
        document.title = `RCommerce | ${response.data.title}`;
      } catch (error) {
        console.log(error);
      }
    };

    getProductById();
  }, [productId]);

  const updateQuantity = (increaseSide) => {
    if (increaseSide === "add") {
      setQuantity((quantity += 1));
    } else {
      if (quantity > 1) setQuantity((quantity -= 1));
    }
  };

  const addToCart = () => {
    dispatch(addProduct({ ...product, quantity, color, size }));
  };

  return (
    <Container>
      <Announcement />
      <NavBar />
      <Wrapper>
        <ImageContainer>
          <Image src={`${product.image}`} />
        </ImageContainer>

        <InfoContainer>
          <Title>{product.title}</Title>
          <ProductDescription>{product.description}</ProductDescription>
          <Price>${product.price}</Price>

          <FilterContainer>
            <Filter>
              <FilterTitle>Color:</FilterTitle>
              {product.color &&
                product.color.map((color) => (
                  <FilterColor
                    color={color}
                    key={color}
                    onClick={() => setColor(color)}
                  />
                ))}
            </Filter>
            <Filter>
              <FilterTitle>Size:</FilterTitle>
              <FIlterSize>
                {product.size &&
                  product.size.map((size) => (
                    <FilterSizeOption
                      key={size}
                      onChange={(e) => setSize(e.target.value)}
                    >
                      {size}
                    </FilterSizeOption>
                  ))}
              </FIlterSize>
            </Filter>
          </FilterContainer>

          <AddContainer>
            <AmountContainer>
              <IconButton
                value="minus"
                onClick={() => updateQuantity("minus")}
                disabled={quantity < 2 ? true : false}
                style={{ color: quantity < 2 ? "" : "black" }}
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
              <Amount>{quantity}</Amount>
              <IconButton
                style={{ color: "black" }}
                value="add"
                onClick={() => updateQuantity("add")}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </AmountContainer>
            <AddToCartButton onClick={addToCart}>Add to Cart</AddToCartButton>
          </AddContainer>

          <Alert
            severity="warning"
            style={{ marginTop: "30px", width: "auto" }}
          >
            Make sure to select your prefered color and size!
          </Alert>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default SingleProduct;
