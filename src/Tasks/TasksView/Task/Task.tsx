import { DeleteForever, Edit, MoreHoriz } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Dialog,
  DialogActions,
  DialogTitle,
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
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [anchorElTask, setAnchorElTask] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorElTask);

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

    handleAlertClose();
    handleMenuClose();
  };

  const editTask = async () => {
    tasksContext!.setTaskContent(task);
    tasksContext!.setOpen((prevOpen) => !prevOpen);

    handleMenuClose();
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElTask(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElTask(null);
  };

  const handleClickOpen = () => {
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    handleMenuClose();
    setIsAlertOpen(false);
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
          aria-controls={isMenuOpen ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={isMenuOpen ? "true" : undefined}
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
          open={isMenuOpen}
          onClose={handleMenuClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleClickOpen}>
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
      <Dialog
        open={isAlertOpen}
        onClose={handleAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Delete task ${task.name}?`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleAlertClose}>Cancel</Button>
          <Button onClick={deleteTask} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Task;
