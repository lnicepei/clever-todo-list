import {
  Box,
  BoxProps,
  Container,
  ContainerProps,
  Typography,
  TypographyProps,
  styled,
} from "@mui/material";

export const HomeContainer = styled(Container)<ContainerProps>({
  display: "flex",
  height: "100vh",
});

export const Home = styled(Box)<BoxProps>({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "100vh",
});

export const Motto = styled(Typography)<TypographyProps>({
  backgroundImage: "linear-gradient(45deg, #178afe 40%, #0059b2 90%)",
  backgroundClip: " text",
  color: "transparent",
  fontWeight: 800,
});

export const ImageContainer = styled(Box)<BoxProps>({
  "@media screen and (max-width: 600px)": {
    display: "none",
  },
});

export const StyledImage = styled("img")({
  height: "90vh",
});
