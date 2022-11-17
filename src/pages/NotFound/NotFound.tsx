import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="md" className="not-found">
      <Box>
        <Typography variant="h1" gutterBottom sx={{ fontWeight: 700 }}>
          404
        </Typography>
      </Box>
      <Box>
        <Typography variant="h3" sx={{ fontWeight: 500 }}>
          The page you're looking for can't be found.
        </Typography>
        <Button variant="contained" sx={{ marginTop: "30px" }} onClick={goHome}>
          Back Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
