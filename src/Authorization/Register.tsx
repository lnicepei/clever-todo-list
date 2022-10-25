import { Box, Button, TextField, Grid } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { registerWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

const Register = ({
  name,
  setName,
  password,
  setPassword,
  email,
  setEmail,
  handleErrorMessage,
}) => {
  const register = () => {
    registerWithEmailAndPassword(name, email, password, handleErrorMessage);
  };

  const navigate = useNavigate();

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
