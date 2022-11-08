import { DeleteForever, Edit, MoreHoriz } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Fade,
  IconButton,
  Menu,
  MenuItem
} from "@mui/material";
import React, { useState } from "react";

type TaskDialogProps = {
  handleEdit: () => void;
  handleDelete: () => void;
  taskName: string;
};

const TaskDialog: React.FC<TaskDialogProps> = ({
  handleEdit,
  handleDelete,
  taskName,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [anchorElTask, setAnchorElTask] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorElTask);

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const openTaskMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElTask(event.currentTarget);
  };

  const openEditMenu = () => {
    handleEdit();
    setAnchorElTask(null);
  };

  const openDeleteSubmission = () => {
    setAnchorElTask(null);
    setIsDialogOpen(true);
  };

  const deleteTask = () => {
    handleDelete();
    closeDialog();
  };

  return (
    <>
      <IconButton
        id="fade-button"
        aria-controls={isMenuOpen ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isMenuOpen ? "true" : undefined}
        onClick={openTaskMenu}
        sx={{ height: "42px" }}
      >
        <MoreHoriz />
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorElTask}
        open={isMenuOpen}
        onClose={() => setAnchorElTask(null)}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={openDeleteSubmission}>
          <DeleteForever />
          &nbsp; Delete
        </MenuItem>
        <MenuItem onClick={openEditMenu}>
          <Edit />
          &nbsp; Edit
        </MenuItem>
      </Menu>
      <Dialog
        open={isDialogOpen}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Delete task ${taskName}?`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={deleteTask} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskDialog;
