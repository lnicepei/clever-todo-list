import {
  Button,
  ButtonProps,
  DialogContent,
  DialogContentProps,
} from "@mui/material";
import { styled } from "@mui/system";

export const StyledDialogContent = styled(DialogContent)<DialogContentProps>({
  display: "flex",
  flexDirection: "column",
});

export const StyledFinishButton = styled(Button)<ButtonProps>(({theme}) => ({
  marginTop: theme.spacing(1),
}));
