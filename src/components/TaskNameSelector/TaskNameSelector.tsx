import React from "react";

import { StyledTextField } from "./style";

type TaskNameSelector = {
  taskContent: Task;
  setTaskContent: React.Dispatch<React.SetStateAction<Task>>;
};

const TaskNameSelector: React.FC<TaskNameSelector> = ({
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
    <StyledTextField
      autoFocus
      required
      margin="dense"
      id="name"
      label="Task Name"
      type="text"
      fullWidth
      variant="outlined"
      autoComplete="off"
      value={taskContent.name}
      onChange={handleChange}
    />
  );
};

export default TaskNameSelector;
