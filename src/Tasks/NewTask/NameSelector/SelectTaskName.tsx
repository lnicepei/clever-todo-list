import { TextField } from "@mui/material";
import React from "react";
import { useTasks, useTasksDispatch } from "../../TasksContext";

const SelectTaskName = () => {
  const tasksContext = useTasks();
  const dispatch = useTasksDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch?.({
      type: "SET_TASK_CONTENT_NAME",
      payload: {
        name: e.target.value,
      },
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
