import { Box, Step, StepContent, StepLabel, Stepper } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { doc, setDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import React, { SetStateAction, useContext, useState } from "react";
import { db } from "../../../firebase/firebase";
import { TasksContext } from "../../Tasks";
import SelectTaskDateAndTime from "../DateSelector/SelectTaskDate";
import SelectTaskName from "../NameSelector/SelectTaskName";

export type TaskContent = {
  taskContent: Task;
  setTaskContent: React.Dispatch<SetStateAction<Task>>;
};

export interface UserFromDB {
  name?: string;
  email: string;
  id: string;
  tasks: Task[];
}

const NewTask = () => {
  const tasksContext = useContext(TasksContext);
  const [activeStep, setActiveStep] = useState(0);
  const [wasEmpty, setWasEmpty] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    tasksContext!.setTaskContent({
      name: "",
      date: "",
      complete: false,
      id: nanoid(),
    });
    setActiveStep(0);
    setWasEmpty(false);
  };

  const handleClickOpen = () => {
    setWasEmpty(true);
    tasksContext!.setOpen(true);
  };

  const handleClose = () => {
    tasksContext!.setTaskContent({
      name: "",
      date: "",
      complete: false,
      id: nanoid(),
    });
    setWasEmpty(false);
    tasksContext!.setOpen(false);
  };

  const createNewTask = async () => {
    await setDoc(doc(db, "users", tasksContext!.userFromDB!.id), {
      ...tasksContext!.userFromDB!.data(),
      tasks: tasksContext!.allTasks.concat(tasksContext!.taskContent),
    });

    tasksContext!.setAllTasks((prevTasks: Task[]) =>
      prevTasks.concat(tasksContext!.taskContent)
    );

    handleClose();
    handleReset();
  };

  const updateExistingTask = async () => {
    await setDoc(doc(db, "users", tasksContext!.userFromDB!.id), {
      ...tasksContext!.userFromDB!.data(),
      tasks: tasksContext!.allTasks.map((task) => {
        if (task.id === tasksContext!.taskContent.id) {
          return tasksContext!.taskContent;
        }
        return task;
      }),
    });

    tasksContext!.setAllTasks((prevTasks: Task[]) =>
      prevTasks.map((task) => {
        if (task.id === tasksContext!.taskContent.id) {
          return tasksContext!.taskContent;
        }
        return task;
      })
    );

    handleClose();
    handleReset();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create new task
      </Button>
      <Dialog open={tasksContext!.open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>Create new task</DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} orientation="vertical">
            <Step>
              <StepLabel>Enter task name</StepLabel>
              <StepContent>
                <SelectTaskName
                  taskContent={tasksContext!.taskContent}
                  setTaskContent={tasksContext!.setTaskContent}
                />
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      disabled={tasksContext!.taskContent.name === ""}
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
                  taskContent={tasksContext!.taskContent}
                  setTaskContent={tasksContext!.setTaskContent}
                />
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      disabled={!tasksContext!.taskContent.date}
                      onClick={wasEmpty ? createNewTask : updateExistingTask}
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
