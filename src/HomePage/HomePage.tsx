import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { Button, Grid, Typography } from "@mui/material";
import logo from "./todo-logo.jpg";

const HomePage = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/tasks");
  }, [user]);

  return (
    <Grid container spacing={2}>
      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        xs={5}
      >
        <Typography variant="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Hi there
        </Typography>
        <Button variant="contained" onClick={() => navigate("/login")}>Log In</Button>
        <Button variant="contained" onClick={() => navigate("/register")}>Register</Button>
      </Grid>
      <Grid item xs={7}>
        <img src={logo} alt="" style={{ height: "90vh" }} />
      </Grid>
    </Grid>
  );
};

export default HomePage;
