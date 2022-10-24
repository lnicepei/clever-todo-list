import { Box, Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid"; // Grid version 1
import { Link } from "react-router-dom";
import { registerWithEmailAndPassword, signInWithGoogle } from "../firebase";

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

  return (
    <Box>
      <Box
        component="form"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          register();
        }}
      >
        <TextField
          variant="outlined"
          fullWidth
          margin="dense"
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="Email"
          fullWidth
          margin="dense"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="Password"
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
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
      </Box>
      <Grid container spacing={6} sx={{ margin: 0 }}>
        <Grid xs={8}>
          <Button
            // fullWidth
            variant="outlined"
            onClick={() => signInWithGoogle(handleErrorMessage)}
          >
            Continue with Google
          </Button>
        </Grid>
        <Grid xs={6}>
          <Link to="/login">Have an account? Log In</Link>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Register;
