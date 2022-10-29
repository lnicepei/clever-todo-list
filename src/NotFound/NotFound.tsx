import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
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
      <Grid container spacing={2}>
        <Grid xs={3}>
          <Typography variant="h1" gutterBottom sx={{ fontWeight: 700 }}>
            404
          </Typography>
        </Grid>
        <Grid xs={10}>
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
        </Grid>
      </Grid>
    </Container>
  );
};
export default NotFound;
