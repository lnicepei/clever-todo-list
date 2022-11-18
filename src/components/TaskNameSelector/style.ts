import { TextField, TextFieldProps, styled } from "@mui/material";

export const StyledTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));
