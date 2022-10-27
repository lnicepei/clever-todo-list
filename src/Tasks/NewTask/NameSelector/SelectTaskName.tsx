import { TextField } from "@mui/material";
import React from "react";
import { Task } from "../TaskInterface";

const SelectTaskName = ({ taskContent, setTaskContent }) => {
  const handleChange = (e) => {
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
