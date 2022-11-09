import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useEffect } from "react";
import { useTasks, useTasksDispatch } from "../../TasksContext";

type SelectTaskDateAndTimeProps = { initialValue: string };

const SelectTaskDateAndTime: React.FC<SelectTaskDateAndTimeProps> = ({
  initialValue,
}) => {
  const tasksContext = useTasks();
  const dispatch = useTasksDispatch();

  const handleChange = (date: Date | null) => {
    dispatch?.({
      type: "SET_TASK_CONTENT_DATE",
      payload: {
        date: date?.toString() ?? "",
      },
    });
  };

  useEffect(() => {
    dispatch?.({
      type: "SET_TASK_CONTENT_DATE",
      payload: {
        date: new Date(initialValue).toString(),
      },
    });
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="Select task date"
        inputFormat="dd/MM/yyyy hh:mm"
        value={tasksContext?.taskContent.date}
        onChange={handleChange}
        disablePast={true}
      />
    </LocalizationProvider>
  );
};

export default SelectTaskDateAndTime;
