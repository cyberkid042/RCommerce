import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(username, password);
  };
  return (
    <div>
      <TextField
        label="username"
        variant="outlined"
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="password"
        type="password"
        variant="outlined"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Login
      </Button>
    </div>
  );
};

export default Login;
