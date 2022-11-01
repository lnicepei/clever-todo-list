import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
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
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
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
      </Box>
      <Box sx={{ display: { md: "block", xs: "none" } }}>
        <img src={logo} alt="" style={{ height: "90vh" }} />
      </Box>
    </Container>
  );
};

export default HomePage;
