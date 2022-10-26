import { Box, Step, StepContent, StepLabel, Stepper } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/firebase";
import SelectTaskDateAndTime from "./SelectTaskDate";
import SelectTaskName from "./SelectTaskName";
import { Task } from "./TaskInterface";

const NewTask = ({ setTasks }) => {
  const [user, loading, error] = useAuthState(auth);
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
    const q = query(collection(db, "users"), where("uid", "==", user?.uid));
    const doc1 = await getDocs(q);
    const data = doc1.docs[0].data();
    await setDoc(doc(db, "users", doc1.docs[0].id), {
      ...data,
      tasks: data.tasks.concat(taskContent),
    });

    setTasks((prevTasks) => prevTasks.concat(taskContent));

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
