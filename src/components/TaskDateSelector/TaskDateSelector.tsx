import { addHours, addMinutes } from "date-fns";

import { useEffect } from "react";

import { TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

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
    setTaskContent((prevTaskContent: Task) => ({
      ...prevTaskContent,
      date: prevTaskContent.date || addMinutes(
        addHours(new Date(initialValue), new Date().getHours()),
        new Date().getMinutes()
      ).toString(),
    }));
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
