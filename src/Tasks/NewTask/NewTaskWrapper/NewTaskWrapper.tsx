import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  IconButton,
  Step,
  StepContent,
  StepLabel,
  Stepper,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { isPast, isToday } from "date-fns";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import { useTasks, useTasksDispatch } from "../../TasksContext";
import SelectTaskDateAndTime from "../DateSelector/SelectTaskDate";
import SelectTaskName from "../NameSelector/SelectTaskName";

type NewTaskWrapperProps = {
  taskContent: Task;
  setTaskContent: React.Dispatch<React.SetStateAction<Task>>;
  isNewTaskMenuOpen: boolean;
  setIsNewTaskMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewTaskWrapper: React.FC<NewTaskWrapperProps> = ({
  taskContent,
  setTaskContent,
  isNewTaskMenuOpen,
  setIsNewTaskMenuOpen,
}) => {
  const tasksContext = useTasks();
  const dispatch = useTasksDispatch();

  const [activeStep, setActiveStep] = useState(0);
  const [wasEmpty, setWasEmpty] = useState(false);

  const isNewTaskVisible =
    !isPast(new Date(tasksContext!.dayToShowTasks)) ||
    isToday(new Date(tasksContext!.dayToShowTasks));

  const isFinishButtonDisabled =
    taskContent?.date === "Invalid Date" ||
    (isPast(new Date(taskContent.date)) &&
      !isToday(new Date(taskContent.date)));

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleClickOpen = () => {
    setWasEmpty(true);
    setIsNewTaskMenuOpen(true);
  };

  const handleClose = () => {
    setTaskContent({
      name: "",
      date: "",
      complete: false,
      id: nanoid(),
    });
    setIsNewTaskMenuOpen(false);
    setWasEmpty(false);
    setActiveStep(0);
  };

  const createNewTask = async () => {
    dispatch?.({
      type: "CREATE",
      payload: {
        taskContent: taskContent,
      },
    });

    handleClose();
  };

  const updateExistingTask = async () => {
    dispatch?.({
      type: "UPDATE",
      payload: {
        taskContent: taskContent,
      },
    });

    handleClose();
  };

  return (
    <Box>
      {isNewTaskVisible && (
        <IconButton onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>
      )}
      <Dialog open={isNewTaskMenuOpen} onClose={handleClose} fullWidth={true}>
        <DialogTitle>Create new task</DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} orientation="vertical">
            <Step>
              <StepLabel>Enter task name</StepLabel>
              <StepContent>
                <SelectTaskName
                  taskContent={taskContent}
                  setTaskContent={setTaskContent}
                />
                <Box sx={{ mb: 2 }}>
                  <Button
                    variant="contained"
                    disabled={taskContent.name === ""}
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Continue
                  </Button>
                </Box>
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Input task date</StepLabel>
              <StepContent>
                <SelectTaskDateAndTime
                  initialValue={
                    wasEmpty ? tasksContext!.dayToShowTasks : taskContent.date
                  }
                  taskContent={taskContent}
                  setTaskContent={setTaskContent}
                />
                <Box sx={{ mb: 2 }}>
                  <Button
                    variant="contained"
                    disabled={isFinishButtonDisabled}
                    onClick={wasEmpty ? createNewTask : updateExistingTask}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Finish
                  </Button>
                  <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                    Back
                  </Button>
                </Box>
              </StepContent>
            </Step>
          </Stepper>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default NewTaskWrapper;
