import React from "react";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const SelectTaskDateAndTime = ({ taskContent, setTaskContent }) => {
  const handleChange = (value) => {
    setTaskContent({ ...taskContent, date: value });
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="Select task date"
        value={taskContent.date}
        onChange={(newValue) => {
          handleChange(newValue);
        }}
      />
    </LocalizationProvider>
  );
};

export default SelectTaskDateAndTime;
