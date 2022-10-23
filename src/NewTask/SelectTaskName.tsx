import { TextField } from "@mui/material";
import React from "react";
import { Task } from "./TaskInterface";

const SelectTaskName = ({ taskContent, setTaskContent }) => {
  const handleChange =
    (prop: keyof Task) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setTaskContent({ ...taskContent, [prop]: event.target.value });
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
      onChange={handleChange("name")}
    />
  );
};

export default SelectTaskName;
