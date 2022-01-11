import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;

  ${mobile({ fontSize: "13px" })}
`;

const Announcement = () => {
  return (
    <Container>Free shipping for iteams $50 and over. Ending soon!</Container>
  );
};

export default Announcement;
