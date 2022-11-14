import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useEffect } from "react";

type SelectTaskDateAndTimeProps = {
  initialValue: string;
  taskContent: Task;
  setTaskContent: React.Dispatch<React.SetStateAction<Task>>;
};

const SelectTaskDateAndTime: React.FC<SelectTaskDateAndTimeProps> = ({
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

export default SelectTaskDateAndTime;
