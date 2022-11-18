import {
  Card,
  CardContent,
  CardContentProps,
  CardProps,
  Checkbox,
  CheckboxProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledTaskCard = styled(Card)<CardProps>({
  display: "flex",
  marginBottom: "10px",
});

export const StyledTaskCardContent = styled(CardContent)<CardContentProps>({
  display: "flex",
  width: "100%",
});

export const StyledCheckbox = styled(Checkbox)<CheckboxProps>({
  height: "42px",
});
