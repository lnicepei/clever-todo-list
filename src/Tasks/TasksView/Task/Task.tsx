import { DeleteForever, Edit, MoreHoriz } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Checkbox,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { doc, setDoc } from "firebase/firestore";
import { useContext, useState } from "react";
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
    tasksContext!.setAllTasks((prevTasks) =>
      prevTasks.filter((taskFromDB: Task) => {
        if (taskFromDB.id !== task.id) {
          return { ...taskFromDB };
        }
      })
    );
    await setDoc(doc(db, "users", tasksContext!.userFromDB!.id), {
      ...tasksContext!.userFromDB!.data(),
      tasks: tasksContext!.allTasks.filter((taskFromDB: Task) => {
        if (taskFromDB.id !== task.id) {
          return { ...taskFromDB };
        }
      }),
    });

    handleClose();
  };

  const editTask = async () => {
    tasksContext!.setTaskContent(task);
    tasksContext!.setOpen((prevOpen) => !prevOpen);

    handleClose();
  };

  const [anchorElTask, setAnchorElTask] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorElTask);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElTask(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElTask(null);
  };

  return (
    <Card>
      <CardContent sx={{ display: "flex" }}>
        <Checkbox checked={task.complete} onChange={toggleComplete}></Checkbox>
        <Typography gutterBottom>{task.name}</Typography>
        <Typography gutterBottom>{`${format(
          new Date(task.date),
          "MMM"
        )}`}</Typography>
        <IconButton
          id="fade-button"
          aria-controls={open ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreHoriz />
        </IconButton>
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorElTask}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={deleteTask}>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <DeleteForever />
              Delete
            </Typography>
          </MenuItem>
          <MenuItem onClick={editTask}>
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              <Edit />
              Edit
            </Typography>
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};

export default Task;
