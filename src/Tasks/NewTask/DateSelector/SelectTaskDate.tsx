import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useContext, useEffect } from "react";
import { TasksContext } from "../../Tasks";

const SelectTaskDateAndTime = () => {
  const tasksContext = useContext(TasksContext);

  const handleChange = (date: Date | null) => {
    tasksContext?.setTaskContent((prevTaskContent) => {
      return { ...prevTaskContent, date: date?.toString() ?? "" };
    });
  };

  useEffect(() => {
    if (tasksContext?.dayToShowTasks) {
      tasksContext?.setTaskContent((prevTaskContent) => {
        return {
          ...prevTaskContent,
          date: new Date(tasksContext?.dayToShowTasks)?.toString() ?? "",
        };
      });
    }
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="Select task date"
        value={tasksContext?.taskContent.date || tasksContext?.dayToShowTasks}
        onChange={handleChange}
        disablePast={true}
      />
    </LocalizationProvider>
  );
};

export default SelectTaskDateAndTime;
