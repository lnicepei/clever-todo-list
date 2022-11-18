import { Avatar, AvatarProps, Box, BoxProps, styled } from "@mui/material";

export const AuthBox = styled(Box)<BoxProps>({
  marginTop: "8em",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const StyledAvatar = styled(Avatar)<AvatarProps>(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.primary.light,
}));
