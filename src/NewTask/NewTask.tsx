import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SelectTaskName from "./SelectTaskName";
import { Task } from "./TaskInterface";
import { Stepper, Step, StepLabel, StepContent, Box } from "@mui/material";
import SelectTaskDateAndTime from "./SelectTaskDate";

const NewTask = () => {
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [taskContent, setTaskContent] = useState<Task>({
    name: "",
    date: "",
    complete: false,
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setTaskContent({
      name: "",
      date: "",
      complete: false,
    });
    setActiveStep(0);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createNewTask = async () => {
    // const [user, loading, error] = useAuthState(auth);
    // const userDoc = doc(db, "users", user?.uid);
    // await updateDoc(userDoc, {
    //   tasks: tasks.push(taskName),
    // });
    alert(JSON.stringify(taskContent));

    handleClose();
    handleReset();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create new task
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
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
                  <div>
                    <Button
                      variant="contained"
                      disabled={taskContent.name === ""}
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Continue
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Input task date</StepLabel>
              <StepContent>
                <SelectTaskDateAndTime
                  taskContent={taskContent}
                  setTaskContent={setTaskContent}
                />
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      disabled={taskContent.date === ""}
                      onClick={createNewTask}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Finish
                    </Button>
                    <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          </Stepper>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewTask;
