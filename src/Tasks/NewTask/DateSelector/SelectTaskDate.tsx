import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TaskContent } from "../NewTaskWrapper/NewTask";

const SelectTaskDateAndTime: React.FC<TaskContent> = ({
  taskContent,
  setTaskContent,
}) => {
  const handleChange = (date: Date | null) => {
    setTaskContent({ ...taskContent, date: date?.toString() ?? "" });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="Select task date"
        value={taskContent.date ?? ""}
        onChange={handleChange}
      />
    </LocalizationProvider>
  );
};

export default SelectTaskDateAndTime;
