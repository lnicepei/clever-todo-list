import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { Button, Stack, Typography } from "@mui/material";

import logo from "../../../public/todo-logo.png";
import { auth } from "../../api/firebase";
import {
  Home,
  HomeContainer,
  ImageContainer,
  Motto,
  StyledImage,
} from "./style";

const HomePage = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/tasks");
  }, [user]);

  return (
    <HomeContainer>
      <Home>
        <Motto variant="h2" gutterBottom>
          Organize your work and life, finally.
        </Motto>
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
      </Home>
      <ImageContainer>
        <StyledImage
          src={logo}
          alt="A man and a woman adjusting tasks shaped as rectangles on a huge task board"
        />
      </ImageContainer>
    </HomeContainer>
  );
};

export default HomePage;
