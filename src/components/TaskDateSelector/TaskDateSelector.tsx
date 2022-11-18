import { useEffect } from "react";

import { TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";

type TaskDateSelector = {
  initialValue: string;
  taskContent: Task;
  setTaskContent: React.Dispatch<React.SetStateAction<Task>>;
};

const TaskDateSelector: React.FC<TaskDateSelector> = ({
  initialValue,
  taskContent,
  setTaskContent,
}) => {
  const handleChange = (date: Date | null) => {
    setTaskContent((prevTaskContent: Task) => {
      return {
        ...prevTaskContent,
        date: date?.toString() ?? new Date(initialValue).toString(),
      };
    });
  };

  useEffect(() => {
    setTaskContent((prevTaskContent: Task) => {
      return {
        ...prevTaskContent,
        date: new Date(initialValue).toString(),
      };
    });
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => (
          <TextField variant="outlined" required {...props} />
        )}
        label="Select task date"
        ampm={false}
        inputFormat="dd/MM/yyyy HH:mm"
        value={taskContent.date}
        onChange={handleChange}
        disablePast={true}
      />
    </LocalizationProvider>
  );
};

export default TaskDateSelector;
