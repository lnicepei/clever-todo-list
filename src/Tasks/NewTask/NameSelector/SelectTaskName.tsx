import { TextField } from "@mui/material";
import React, { useContext } from "react";
import { TasksContext } from "../../Tasks";

const SelectTaskName = () => {
  const tasksContext = useContext(TasksContext);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    tasksContext!.setTaskContent((prevTaskContent) => {
      return { ...prevTaskContent, name: e.target.value };
    });
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
      value={tasksContext!.taskContent.name}
      onChange={handleChange}
    />
  );
};

export default SelectTaskName;
