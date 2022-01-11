import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutline from "@material-ui/icons/RemoveCircleOutline";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";

import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import axios from "axios";

const KEY = process.env.REACT_APP_STRIPE_TOKEN;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;

  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;

  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "teal" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductID = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;

  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;

  ${mobile({ marginBottom: "20px" })}
`;

// const Hr = styled.hr`
//   background-color: #eee;
//   border: none;
//   height: 1px;
// `;

const Summary = styled.span`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 35vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: teal;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxY2RlYTA5OGZkZGFhY2I2ZDA2YjNiNCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MTc3MDUzMywiZXhwIjoxNjQyMDI5NzMzfQ.rZZcIJeLgX4zfOq39Fj8TzOOeJVAvOZDJUWCOV9tZk0";

const headers = {
  "Content-Type": "application/json",
  token: `Bearer ${token}`,
};

const Cart = () => {
  let cartItems = useSelector((state) => state.cart.products);
  let cartTotal = useSelector((state) => state.cart.total);
  const navigate = useNavigate();

  const [stripeToken, setStripeToken] = useState(null);

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makePayment = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/pay",
          {
            tokenId: stripeToken.id,
            amount: parseInt((cartTotal * 100).toFixed(2)),
          },
          {
            headers: headers,
          }
        );
        navigate("/thank-you", { state: { data: response.data } });
      } catch (error) {
        console.log(error);
      }
    };

    stripeToken && cartTotal >= 1 && makePayment();
  }, [stripeToken, cartTotal, navigate]);

  return (
    <Container>
      <Announcement />
      <NavBar />
      <Wrapper>
        <Title>Your Bag</Title>
        <Top>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <TopButton>Continue Shopping</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag ({cartItems.length})</TopText>
            <TopText>Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">Checkout Now</TopButton>
        </Top>
        {cartItems.length < 1 ? (
          <Title>Your Shopping Bag is Empty!</Title>
        ) : (
          <Bottom>
            <Info>
              {cartItems.map((item) => (
                <Product key={item._id}>
                  <ProductDetail>
                    <Image src={item.image} />
                    <Details>
                      <ProductName>
                        <b>Product: </b> {item.title}
                      </ProductName>
                      <ProductID>
                        <b>Product ID: </b> {item._id}
                      </ProductID>
                      <ProductColor color={item.color} />
                      <ProductSize>
                        <b>Size: </b> {item.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <RemoveCircleOutline />
                      <ProductAmount>{item.quantity}</ProductAmount>
                      <AddCircleOutline />
                    </ProductAmountContainer>
                    <ProductPrice>
                      $ {(item.price * item.quantity).toFixed(2)}
                    </ProductPrice>
                  </PriceDetail>
                </Product>
              ))}
              {/* <Hr /> */}
            </Info>
            <Summary>
              <SummaryTitle>Order Summary</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal:</SummaryItemText>
                <SummaryItemPrice>${cartTotal.toFixed(2)}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping:</SummaryItemText>
                <SummaryItemPrice>$5.99</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount:</SummaryItemText>
                <SummaryItemPrice>$-5.99</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total:</SummaryItemText>
                <SummaryItemPrice>${cartTotal.toFixed(2)}</SummaryItemPrice>
              </SummaryItem>
              <StripeCheckout
                token={onToken}
                stripeKey={KEY}
                name="RCommerce"
                billingAddress
                shippingAddress
                description={`Your total today is ${cartTotal.toFixed(2)}`}
                amount={parseInt((cartTotal * 100).toFixed(2))}
                image="https://freepngimg.com/download/shopping/73435-shopping-illustration-cart-stock-free-download-png-hq.png"
              >
                <Button>CHECKOUT NOW</Button>
              </StripeCheckout>
            </Summary>
          </Bottom>
        )}
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Cart;
