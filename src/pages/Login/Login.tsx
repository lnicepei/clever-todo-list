import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import GoogleIcon from "@mui/icons-material/Google";
import { Box, Button, Grid, TextField } from "@mui/material";

import {
  signInWithGoogle,
  logInWithEmailAndPassword,
} from "../../api/firebase";
import { AuthContext } from "../../components/AuthWrapper/AuthWrapper";

const Login = () => {
  const { password, setPassword, email, setEmail, handleErrorMessage } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const login = () => {
    logInWithEmailAndPassword(email, password, handleErrorMessage);
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        login();
      }}
      sx={{ mt: 3 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            label="Email"
            name="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button type="submit" fullWidth variant="contained">
            Log In
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => signInWithGoogle(handleErrorMessage)}
          >
            <GoogleIcon />
            Use Google
          </Button>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Button variant="text" onClick={() => navigate("/register")}>
            Sign up
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
