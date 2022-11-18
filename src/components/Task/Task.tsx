import { format } from "date-fns";

import { Typography } from "@mui/material";
import { Container } from "@mui/system";

import TaskOptions from "../TaskOptions/TaskOptions";
import { useTasksDispatch } from "../TasksContext/TasksContext";
import { StyledCheckbox, StyledTaskCard, StyledTaskCardContent } from "./style";

declare global {
  interface Task {
    name: string;
    date: string;
    complete: boolean;
    id: string;
  }
}

type TaskProps = {
  task: Task;
  setIsNewTaskMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTaskContent: () => void;
};

const Task: React.FC<TaskProps> = ({
  task,
  setIsNewTaskMenuOpen,
  setTaskContent,
}) => {
  const dispatch = useTasksDispatch();

  const handleToggle = () => {
    dispatch?.({
      type: "TOGGLE_COMPLETE",
      payload: {
        task: task,
      },
    });
  };

  const handleDelete = () => {
    setIsNewTaskMenuOpen(false);
    dispatch?.({
      type: "DELETE",
      payload: {
        task: task,
      },
    });
  };

  const openEditMenu = () => {
    setTaskContent();
    setIsNewTaskMenuOpen(true);
  };

  return (
    <StyledTaskCard>
      <StyledTaskCardContent>
        <StyledCheckbox checked={task.complete} onChange={handleToggle} />
        <Container>
          <Typography variant="h5">{task.name}</Typography>
          <Typography variant="subtitle2">{`${format(
            new Date(task.date),
            "H:mm"
          )}`}</Typography>
        </Container>
        <TaskOptions
          handleEdit={openEditMenu}
          handleDelete={handleDelete}
          taskName={task.name}
        />
      </StyledTaskCardContent>
    </StyledTaskCard>
  );
};

export default Task;
