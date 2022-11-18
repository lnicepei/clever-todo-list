import TaskIcon from "@mui/icons-material/Task";
import {
  IconButton,
  IconButtonProps,
  IconProps,
  Menu,
  MenuProps,
  Typography,
  TypographyProps,
  styled,
} from "@mui/material";

export const StyledTaskIcon = styled(TaskIcon)<IconProps>(({ theme }) => ({
  marginRight: theme.spacing(1),
  "@media screen and (max-width: 600px)": {
    display: "none",
  },
}));

export const StyledLogo = styled(Typography)<TypographyProps>({
  marginRight: "auto",
});

export const StyledUsername = styled(Typography)<TypographyProps>(
  ({ theme }) => ({
    marginRight: theme.spacing(1),
  })
);

export const StyledIconButton = styled(IconButton)<IconButtonProps>({
  padding: 0,
});

export const StyledMenu = styled(Menu)<MenuProps>({
  marginTop: "45px",
});
