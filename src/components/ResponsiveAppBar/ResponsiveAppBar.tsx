import React, { useCallback, useState } from "react";

import {
  AppBar,
  Avatar,
  IconButton,
  MenuItem,
  Toolbar,
  Tooltip,
} from "@mui/material";

import { logout } from "../../api/firebase";
import {
  StyledLogo,
  StyledMenu,
  StyledTaskIcon,
  StyledUsername,
} from "./style";

type ResponsiveAppBarProps = {
  username: string;
  photoUrl: string | undefined;
};

const ResponsiveAppBar: React.FC<ResponsiveAppBarProps> = ({
  username,
  photoUrl,
}) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    },
    []
  );

  const croppedUsername = username.includes("@")
    ? username
    : username.split(" ")[0];

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  return (
    <AppBar position="relative" color="primary">
      <Toolbar>
        <StyledTaskIcon />
        <StyledLogo variant="h5">TodoList</StyledLogo>
        <StyledUsername>{croppedUsername}</StyledUsername>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu}>
            <Avatar alt={username} src={photoUrl} />
          </IconButton>
        </Tooltip>
        <StyledMenu
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={!!anchorElUser}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={logout}>Log out</MenuItem>
        </StyledMenu>
      </Toolbar>
    </AppBar>
  );
};
export default ResponsiveAppBar;
