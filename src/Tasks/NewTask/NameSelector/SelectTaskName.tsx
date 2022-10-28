import { TextField } from "@mui/material";
import React from "react";
import { TaskContentInterface } from "../NewTaskWrapper/NewTask";

const SelectTaskName = ({
  taskContent,
  setTaskContent,
}: TaskContentInterface) => {
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
