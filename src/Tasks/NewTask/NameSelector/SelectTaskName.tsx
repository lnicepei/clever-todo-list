import { TextField } from "@mui/material";
import React from "react";
import { TaskContent } from "../NewTaskWrapper/NewTask";

const SelectTaskName: React.FC<TaskContent> = ({
  taskContent,
  setTaskContent,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTaskContent({ ...taskContent, name: e.target.value });
  };

  return (
    <TextField
      autoFocus
      required
      margin="dense"
      id="name"
      label="Task Name"
      type="text"
      fullWidth
      variant="standard"
      value={taskContent.name}
      onChange={handleChange}
    />
  );
};

export default SelectTaskName;
