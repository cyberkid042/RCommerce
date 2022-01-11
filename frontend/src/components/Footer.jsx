import styled from "styled-components";
import Facebook from "@material-ui/icons/Facebook";
import Instagram from "@material-ui/icons/Instagram";
import Twitter from "@material-ui/icons/Twitter";
import RoomIcon from "@material-ui/icons/Room";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;

  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Description = styled.p`
  margin: 20px 0;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`;

//footer middle section
const Center = styled.div`
  flex: 1;
  padding: 20px;

  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  cursor: pointer;
`;

//Footer right section
const Right = styled.div`
  flex: 1;
  padding: 20px;

  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>RCOMMERCE.</Logo>
        <Description>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quas
          dolores cupiditate? Labore officia deleniti cumque incidunt aut facere
          dolorum. Corrupti ipsa molestias et nobis doloremque quisquam delectus
          quo fugit.
        </Description>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem key={1}>Home</ListItem>
          <ListItem key={2}>Cart</ListItem>
          <ListItem key={3}>Men Fashion</ListItem>
          <ListItem key={4}>Women Fashion</ListItem>
          <ListItem key={5}>Accessories</ListItem>
          <ListItem key={6}>My Account</ListItem>
          <ListItem key={7}>Order Tracking </ListItem>
          <ListItem key={8}>Wishlist</ListItem>
          <ListItem key={9}>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <RoomIcon style={{ marginRight: "10px" }} />
          305 Onye Egwu Ave, Ocha Highway 90876
        </ContactItem>
        <ContactItem>
          <PhoneIcon style={{ marginRight: "10px" }} />
          +1 857 588 5096
        </ContactItem>
        <ContactItem>
          <EmailIcon style={{ marginRight: "10px" }} />
          sales@rcommerce.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
