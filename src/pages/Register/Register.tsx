import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import GoogleIcon from "@mui/icons-material/Google";
import { Button, Grid, TextField } from "@mui/material";

import {
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../api/firebase";
import { AuthContext } from "../../components/AuthWrapper/AuthWrapper";
import { StyledRegister } from "./style";

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

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    register();
  };

  const register = () => {
    registerWithEmailAndPassword(name, email, password, handleErrorMessage);
  };

  return (
    <StyledRegister component="form" onSubmit={handleSubmit}>
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
          <Button variant="text" onClick={() => navigate("/login")}>
            Log in
          </Button>
        </Grid>
      </Grid>
    </StyledRegister>
  );
};
export default Register;
