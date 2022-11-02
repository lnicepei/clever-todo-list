import { Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        boxSizing: "border-box",
      }}
    >
      <Container>
        <Box>
          <Typography variant="h1" gutterBottom sx={{ fontWeight: 700 }}>
            404
          </Typography>
        </Box>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 500 }}>
            The page you're looking for can't be found.
          </Typography>
          <Button
            variant="contained"
            sx={{ marginTop: "30px" }}
            onClick={goHome}
          >
            Back Home
          </Button>
        </Box>
      </Container>
    </Container>
  );
};
export default NotFound;
