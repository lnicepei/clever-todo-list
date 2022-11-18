import {
  Button,
  ButtonProps,
  Container,
  Typography,
  TypographyProps,
  styled,
} from "@mui/material";

export const NotFoundContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  height: "100vh",
  maxWidth: theme.breakpoints.values.md,
}));

export const MainText = styled(Typography)<TypographyProps>({
  fontWeight: 700,
});

export const Description = styled(Typography)<TypographyProps>({
  fontWeight: 500,
});

export const GoHomeButton = styled(Button)<ButtonProps>({
  marginTop: "30px",
});
