import { Card, CardContent, Checkbox, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { format } from "date-fns";
import { useTasksDispatch } from "../../TasksContext";
import TaskDialog from "../TaskDialog/TaskDialog";

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
};

const Task: React.FC<TaskProps> = ({ task }) => {
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
    dispatch?.({
      type: "DELETE",
      payload: {
        task: task,
      },
    });
  };

  const openEditMenu = () => {
    dispatch?.({
      type: "TOGGLE_OPEN",
      payload: {
        task: task,
      },
    });
  };

  return (
    <Card sx={{ display: "flex", mb: "10px" }}>
      <CardContent sx={{ display: "flex", width: "100%" }}>
        <Checkbox
          sx={{ height: "42px" }}
          checked={task.complete}
          onChange={handleToggle}
        ></Checkbox>
        <Container sx={{ mr: "auto" }}>
          <Typography variant="h5">{task.name}</Typography>
          <Typography variant="subtitle2">{`${format(
            new Date(task.date),
            "H:mm"
          )}`}</Typography>
        </Container>
        <TaskDialog
          handleEdit={openEditMenu}
          handleDelete={handleDelete}
          taskName={task.name}
        />
      </CardContent>
    </Card>
  );
};

export default Task;
