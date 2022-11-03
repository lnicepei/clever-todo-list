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
import React, { useContext, useState } from "react";
import { logout } from "../../firebase/firebase";
import { TasksContext } from "../Tasks";

const ResponsiveAppBar = () => {
  const tasksContext = useContext(TasksContext);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ color: "white", backgroundColor: "black" }}
      >
        <Toolbar>
          <TaskIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { md: "flex" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TodoList
          </Typography>

          <Typography
            sx={{
              display: { md: "flex", xs: "none" },
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              color: "white",
              textDecoration: "none",
            }}
          >
            {tasksContext!.name}
          </Typography>
          <Typography
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              color: "white",
              textDecoration: "none",
            }}
          >
            {tasksContext!.name.includes(".")
              ? tasksContext!.name.split(".")[0]
              : tasksContext!.name.split(" ")[0]}
          </Typography>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt={tasksContext!.name}
                src={tasksContext!.user?.photoURL ?? undefined}
              ></Avatar>
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
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center" onClick={logout}>
                Log out
              </Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default ResponsiveAppBar;
