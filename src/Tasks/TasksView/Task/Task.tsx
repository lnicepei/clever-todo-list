import { Card, CardContent, Checkbox, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { format } from "date-fns";
import { doc, setDoc } from "firebase/firestore";
import { useContext } from "react";
import { db } from "../../../firebase/firebase";
import { TasksContext } from "../../Tasks";
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
  const tasksContext = useContext(TasksContext);

  const toggleComplete = async () => {
    tasksContext!.setAllTasks((prevTasks) =>
      prevTasks.map((taskFromDB: Task) => {
        if (taskFromDB.id === task.id) {
          return { ...taskFromDB, complete: !task.complete };
        }
        return { ...taskFromDB };
      })
    );

    await setDoc(doc(db, "users", tasksContext!.userFromDB!.id), {
      ...tasksContext!.userFromDB!.data(),
      tasks: tasksContext!.allTasks.map((taskFromDB: Task) => {
        if (taskFromDB.id === task.id) {
          return { ...taskFromDB, complete: !task.complete };
        }
        return { ...taskFromDB };
      }),
    });
  };

  const deleteTask = async () => {
    await setDoc(doc(db, "users", tasksContext!.userFromDB!.id), {
      ...tasksContext!.userFromDB!.data(),
      tasks: tasksContext!.allTasks.filter((taskFromDB: Task) => {
        if (taskFromDB.id !== task.id) {
          return { ...taskFromDB };
        }
      }),
    });

    tasksContext!.setAllTasks((prevTasks) =>
      prevTasks.filter((taskFromDB: Task) => {
        if (taskFromDB.id !== task.id) {
          return { ...taskFromDB };
        }
      })
    );
  };

  const editTask = async () => {
    tasksContext!.setTaskContent(task);
    tasksContext!.setOpen((prevOpen) => !prevOpen);
  };

  return (
    <Card sx={{ display: "flex", mb: "10px" }}>
      <CardContent sx={{ display: "flex", width: "100%" }}>
        <Checkbox
          sx={{ height: "42px" }}
          checked={task.complete}
          onChange={toggleComplete}
        ></Checkbox>
        <Container sx={{ mr: "auto" }}>
          <Typography variant="h5">{task.name}</Typography>
          <Typography variant="subtitle2">{`${format(
            new Date(task.date),
            "H:mm"
          )}`}</Typography>
        </Container>
        <TaskDialog
          editTask={editTask}
          deleteTask={deleteTask}
          taskName={task.name}
        />
      </CardContent>
    </Card>
  );
};

export default Task;
