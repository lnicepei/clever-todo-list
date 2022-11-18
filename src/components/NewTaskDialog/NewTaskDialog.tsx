import { isPast, isToday } from "date-fns";

import React from "react";

import { Dialog, DialogTitle } from "@mui/material";

import SelectTaskDateAndTime from "../TaskDateSelector/TaskDateSelector";
import TaskNameSelector from "../TaskNameSelector/TaskNameSelector";
import { useTasks, useTasksDispatch } from "../TasksContext/TasksContext";
import { StyledDialogContent, StyledFinishButton } from "./style";

type NewTaskDialogProps = {
  taskContent: Task;
  setTaskContent: React.Dispatch<React.SetStateAction<Task>>;
  isNewTaskMenuOpen: boolean;
  setIsNewTaskMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  wasNewTaskDialogEmpty: boolean;
  handleTaskDialogClose: () => void;
};

const NewTaskDialog: React.FC<NewTaskDialogProps> = ({
  taskContent,
  setTaskContent,
  isNewTaskMenuOpen,
  wasNewTaskDialogEmpty,
  handleTaskDialogClose,
}) => {
  const tasksContext = useTasks();
  const dispatch = useTasksDispatch();

  const isFinishButtonDisabled =
    taskContent?.date === "Invalid Date" ||
    taskContent.name === "" ||
    (isPast(new Date(taskContent.date)) &&
      !isToday(new Date(taskContent.date)));

  const createNewTask = async () => {
    dispatch?.({
      type: "CREATE",
      payload: {
        taskContent: taskContent,
      },
    });

    handleTaskDialogClose();
  };

  const updateExistingTask = async () => {
    dispatch?.({
      type: "UPDATE",
      payload: {
        taskContent: taskContent,
      },
    });

    handleTaskDialogClose();
  };

  return (
    <Dialog
      open={isNewTaskMenuOpen}
      onClose={handleTaskDialogClose}
      fullWidth={true}
    >
      <DialogTitle>Create new task</DialogTitle>
      <StyledDialogContent>
        <TaskNameSelector
          taskContent={taskContent}
          setTaskContent={setTaskContent}
        />
        <SelectTaskDateAndTime
          initialValue={
            wasNewTaskDialogEmpty
              ? tasksContext!.dayToShowTasks
              : taskContent.date
          }
          taskContent={taskContent}
          setTaskContent={setTaskContent}
        />
        <StyledFinishButton
          variant="contained"
          disabled={isFinishButtonDisabled}
          onClick={wasNewTaskDialogEmpty ? createNewTask : updateExistingTask}
        >
          Finish
        </StyledFinishButton>
      </StyledDialogContent>
    </Dialog>
  );
};

export default NewTaskDialog;
