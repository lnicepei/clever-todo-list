import React, { useState } from "react";

import { DeleteForever, Edit, MoreHoriz } from "@mui/icons-material";
import { Fade, Menu, MenuItem } from "@mui/material";

import TaskDeleteDialog from "../TaskDeleteDialog/TaskDeleteDialog";
import { StyledIconButton } from "./style";

type TaskOptions = {
  handleEdit: () => void;
  handleDelete: () => void;
  taskName: string;
};

const TaskOptions: React.FC<TaskOptions> = ({
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
      <StyledIconButton
        id="fade-button"
        aria-controls={isMenuOpen ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isMenuOpen ? "true" : undefined}
        onClick={openTaskMenu}
      >
        <MoreHoriz />
      </StyledIconButton>
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
      <TaskDeleteDialog
        taskName={taskName}
        isDialogOpen={isDialogOpen}
        deleteTask={deleteTask}
        closeDialog={closeDialog}
      />
    </>
  );
};

export default TaskOptions;
