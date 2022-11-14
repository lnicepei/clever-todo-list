import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import logo from "../../../public/todo-logo.png";
import { auth } from "../../api/firebase";
import "./HomePage.css";

const HomePage = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/tasks");
  }, [user]);

  return (
    <Container sx={{ display: "flex", height: "100vh" }}>
      <Box className="home">
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 800 }}>
          Organize your work and life, finally.
        </Typography>
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
        <img
          src={logo}
          alt="A man and a woman adjusting tasks shaped as rectangles on a huge task board"
          style={{ height: "90vh" }}
        />
      </Box>
    </Container>
  );
};

export default HomePage;
