import TaskIcon from "@mui/icons-material/Task";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { logout } from "../../api/firebase";

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

  const croppedUsername = username.includes(".")
    ? username.split(".")[0]
    : username.split(" ")[0];

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative" color="primary">
        <Toolbar>
          <TaskIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography variant="h5" noWrap sx={{ flexGrow: 1 }}>
            TodoList
          </Typography>
          <Typography sx={{ mr: 2 }}>{croppedUsername}</Typography>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={username} src={photoUrl}></Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
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
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default ResponsiveAppBar;
