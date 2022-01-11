import styled from "styled-components";
import { mobile } from "../../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 20px;
  width: 40%;
  background-color: white;

  ${mobile({ width: "80%" })}
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0 0;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Create an Account!</Title>

        <Form>
          <Input placeholder="Enter your first name" autoFocus />
          <Input placeholder="Enter your last name" />
          <Input placeholder="Enter a username" />
          <Input placeholder="Enter your email" />
          <Input placeholder="Enter password" type={"password"} />
          <Input placeholder="confirm password" type={"password"} />
          <Agreement>
            By Creating an account, you agree to the processing of your data in
            accordance with our <b>PRIVACY POLICY</b>
          </Agreement>

          <Button>Create</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
