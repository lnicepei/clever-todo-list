import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";

import {
  Description,
  GoHomeButton,
  MainText,
  NotFoundContainer,
} from "./style";

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <NotFoundContainer>
      <Box>
        <MainText variant="h1" gutterBottom>
          404
        </MainText>
      </Box>
      <Box>
        <Description variant="h3">
          The page you're looking for can't be found.
        </Description>
        <GoHomeButton variant="contained" onClick={goHome}>
          Back Home
        </GoHomeButton>
      </Box>
    </NotFoundContainer>
  );
};

export default NotFound;
