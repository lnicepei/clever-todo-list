import { Box, Step, StepContent, StepLabel, Stepper } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  doc,
  DocumentData,
  QueryDocumentSnapshot,
  setDoc,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import React, { SetStateAction, useState } from "react";
import { db } from "../../../firebase/firebase";
import SelectTaskDateAndTime from "../DateSelector/SelectTaskDate";
import SelectTaskName from "../NameSelector/SelectTaskName";

export interface TaskContentInterface {
  taskContent: Task;
  setTaskContent: React.Dispatch<SetStateAction<Task>>;
}

interface NewTaskProps {
  setAllTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  userFromDB: QueryDocumentSnapshot<DocumentData> | undefined;
}

export interface UserFromDB {
  name?: string;
  email: string;
  id: string;
  tasks: Task[];
}

const NewTask = ({ setAllTasks, userFromDB }: NewTaskProps) => {
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [taskContent, setTaskContent] = useState<Task>({
    name: "",
    date: "",
    complete: false,
    id: nanoid(),
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
      id: taskContent.id,
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
    await setDoc(doc(db, "users", userFromDB!.id), {
      ...userFromDB!.data(),
      tasks: userFromDB!.data().tasks.concat(taskContent),
    });

    setAllTasks((prevTasks: Task[]) => prevTasks.concat(taskContent));

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
                      disabled={!taskContent.date}
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
