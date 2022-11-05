import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useContext, useEffect } from "react";
import { TasksContext } from "../../Tasks";

type SelectTaskDateAndTimeProps = { initialValue: string };

const SelectTaskDateAndTime: React.FC<SelectTaskDateAndTimeProps> = ({
  initialValue,
}) => {
  const tasksContext = useContext(TasksContext);

  const handleChange = (date: Date | null) => {
    tasksContext?.setTaskContent((prevTaskContent) => {
      return { ...prevTaskContent, date: date?.toString() ?? "" };
    });
  };

  useEffect(() => {
    tasksContext?.setTaskContent((prevTaskContent) => {
      return {
        ...prevTaskContent,
        date: new Date(initialValue).toString(),
      };
    });
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="Select task date"
        value={tasksContext?.taskContent.date}
        onChange={handleChange}
        disablePast={true}
      />
    </LocalizationProvider>
  );
};

export default SelectTaskDateAndTime;
