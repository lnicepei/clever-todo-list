import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import logo from "../../public/todo-logo.jpg";
import { auth } from "../firebase/firebase";

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
        <Typography paragraph={true} gutterBottom>
          Become focused, organized, and calm with Clever Todo List.
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={() => navigate("/register")}>
            Start For Free
          </Button>
          <Button variant="outlined" onClick={() => navigate("/login")}>
            Log In
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
