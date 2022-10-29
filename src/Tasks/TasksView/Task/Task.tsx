import { Card, CardContent, Checkbox, Typography } from "@mui/material";
import { format } from "date-fns";
import { doc, setDoc } from "firebase/firestore";
import { useContext } from "react";
import { db } from "../../../firebase/firebase";
import { TasksContext } from "../../Tasks";

declare global {
  interface Task {
    name: string;
    date: string;
    complete: boolean;
    id: string;
  }
}

interface TaskProps {
  task: Task;
}

const Task = ({ task }: TaskProps) => {
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

  return (
    <Card
      sx={{
        color: "#333",
        backgroundColor: "#c3d9d9",
        boxShadow:
          "-5px -5px 9px rgba(255, 255, 255, 0.45), 5px 5px 9px rgba(94, 104, 121, 0.3)",
        cursor: "pointer",
      }}
    >
      <CardContent>
        <Checkbox checked={task.complete} onChange={toggleComplete}></Checkbox>
        <Typography gutterBottom>{task.name}</Typography>
        <Typography gutterBottom>{`${format(
          new Date(task.date),
          "MMM"
        )}`}</Typography>
      </CardContent>
    </Card>
  );
};

export default Task;
