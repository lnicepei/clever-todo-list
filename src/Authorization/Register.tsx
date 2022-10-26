import GoogleIcon from "@mui/icons-material/Google";
import { Box, Button, Grid, TextField } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase/firebase";
import { AuthContext } from "./AuthContext";

const Register = () => {
  const {
    name,
    setName,
    password,
    setPassword,
    email,
    setEmail,
    handleErrorMessage,
  } = useContext(AuthContext);

  const register = () => {
    registerWithEmailAndPassword(name, email, password, handleErrorMessage);
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        register();
      }}
      sx={{ mt: 3 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            label="Email"
            autoComplete="off"
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
            Sign Up
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
          <Button variant="text">
            <Link to="/login">Log in</Link>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Register;
