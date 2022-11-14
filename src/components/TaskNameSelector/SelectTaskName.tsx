import { TextField } from "@mui/material";
import React from "react";

type SelectTaskNameProps = {
  taskContent: Task;
  setTaskContent: React.Dispatch<React.SetStateAction<Task>>;
};

const SelectTaskName: React.FC<SelectTaskNameProps> = ({
  taskContent,
  setTaskContent,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTaskContent((prevTaskContent: Task) => {
      return {
        ...prevTaskContent,
        name: e.target.value,
      };
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
      variant="outlined"
      autoComplete="off"
      sx={{mb: 2}}
      value={taskContent.name}
      onChange={handleChange}
    />
  );
};

export default SelectTaskName;
