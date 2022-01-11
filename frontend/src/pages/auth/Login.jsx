import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../../responsive";
import { login } from "../../store/api/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/999267/pexels-photo-999267.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 20px;
  width: 35%;

  ${mobile({ width: "80%" })}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 10px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;

  &:disabled {
    color: #041c32;
    cursor: not-allowed;
  }
`;

const Links = styled.p`
  margin: 5px 0;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Logo = styled.h1`
  font-weight: bold;
  text-align: center;
  padding-bottom: 20px;
  cursor: pointer;

  ${mobile({ fontSize: "15px", marginLeft: "6px" })}
`;

const Body = styled.div`
  background-color: white;
  padding: 20px;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const info = {
    username,
    password,
  };

  const handleLogin = (e) => {
    e.preventDefault();

    login(dispatch, info);
  };
  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <Logo>RCOMMERCE.</Logo>
        </Link>
        <Body>
          {error && (
            <Alert severity="error" style={{ marginBottom: "15px" }}>
              An error has occured. Please check your credentials!
            </Alert>
          )}
          <Title>Welcome Back!</Title>

          <Form>
            <Input
              placeholder="Enter username"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Enter password"
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button onClick={handleLogin} disabled={isFetching ? true : false}>
              {isFetching ? (
                <CircularProgress size={22} style={{ color: "white" }} />
              ) : (
                "Login"
              )}
            </Button>

            <Links>Forgot Password?</Links>

            <Link to="/join">
              <Links style={{ color: "black" }}>Create a new Account</Links>
            </Link>
          </Form>
        </Body>
      </Wrapper>
    </Container>
  );
};

export default Login;
