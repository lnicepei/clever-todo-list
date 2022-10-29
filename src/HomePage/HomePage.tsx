import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { Button, Grid, Typography, Stack } from "@mui/material";
import { withStyles } from "@mui/styles";
import logo from "./todo-logo.jpg";

const CustomColor = withStyles({
  root: {
    background: "linear-gradient(45deg, #178afe 20%, #0059b2 90%)",
    fontFamily: "PlusJakartaSans",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
})(Typography);

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
        }}
        xs={5}
      >
        <CustomColor variant="h2" gutterBottom sx={{ fontWeight: 800 }}>
          Organize your work and life, finally.
        </CustomColor>
        <Typography paragraph={true} gutterBottom color="#3E5060">
          Become focused, organized, and calm with Clever Todo List.
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" sx={{ backgroundColor: "#007fff" }}>
            <Link
              to="/register"
              style={{ color: "white", textDecoration: "none" }}
            >
              Start For Free
            </Link>
          </Button>
          <Button variant="outlined">
            <Link to="/login" style={{ textDecoration: "none" }}>
              Log In
            </Link>
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={7}>
        <img src={logo} alt="" style={{ height: "90vh" }} />
      </Grid>
    </Grid>
  );
};

export default HomePage;
