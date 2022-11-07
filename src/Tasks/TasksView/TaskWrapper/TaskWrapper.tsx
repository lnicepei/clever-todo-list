import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { format, isAfter, isSameDay } from "date-fns";
import { useContext } from "react";
import { PuffLoader } from "react-spinners";
import NewTask from "../../NewTask/NewTaskWrapper/NewTaskWrapper";
import { TasksContext } from "../../Tasks";
import Task from "../Task/Task";

const TaskView = () => {
  const tasksContext = useContext(TasksContext);

  const isNoUser = tasksContext?.userFromDB?.data().tasks === undefined;

  const sortedTasks = tasksContext!.allTasks
    .filter((task: Task) =>
      isSameDay(new Date(task.date), new Date(tasksContext!.dayToShowTasks))
    )
    ?.sort((a: Task, b: Task) => +isAfter(new Date(a.date), new Date(b.date)))
    .map((task: Task, index: number) => <Task task={task} key={index} />);

  const chosenDay = format(
    new Date(tasksContext!.dayToShowTasks),
    "dd/MM/yyyy"
  );

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        px: { xs: 2, md: 0, lg: 0, sm: 0 },
      }}
    >
      {isNoUser ? (
        <PuffLoader />
      ) : (
        <>
          <Box sx={{ display: "flex", height: "40px", mb: 1 }}>
            <Typography
              variant="h5"
              sx={{ display: "flex", alignItems: "center", mr: 1 }}
            >
              {sortedTasks.length || "No"} task
              {(sortedTasks.length > 1 || sortedTasks.length === 0) &&
                "s"} for {chosenDay}
            </Typography>
            <NewTask />
          </Box>
          {sortedTasks}
        </>
      )}
    </Container>
  );
};

export default TaskView;
