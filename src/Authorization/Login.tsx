import { Box, Button, TextField } from "@mui/material";
import { logInWithEmailAndPassword } from "../firebase";
import { Link } from "react-router-dom";

const Login = ({
  password,
  setPassword,
  email,
  setEmail,
  handleErrorMessage,
}) => {
  const login = () => {
    logInWithEmailAndPassword(email, password, handleErrorMessage);
  };

  return (
    <Box>
      <Box
        component="form"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
      >
        <TextField
          variant="outlined"
          label="Email"
          name="email"
          fullWidth
          margin="dense"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="dense"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
        >
          Sign In
        </Button>
      </Box>
      <Link to="/register">Do not have an account? Register</Link>
    </Box>
  );
};

export default Login;
