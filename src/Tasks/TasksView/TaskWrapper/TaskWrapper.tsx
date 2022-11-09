import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { format, isAfter, isSameDay } from "date-fns";
import { User } from "firebase/auth";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { fetchUserData } from "../../../firebase/firebase";
import NewTaskWrapper from "../../NewTask/NewTaskWrapper/NewTaskWrapper";
import { useTasks, useTasksDispatch } from "../../TasksContext";
import StyledPuffLoader from "../StyledPuffLoader/StyledPuffLoader";
import Task from "../Task/Task";

type TaskWrapperProps = {
  user: User | null | undefined;
};

const TaskWrapper: React.FC<TaskWrapperProps> = ({ user }) => {
  const tasksContext = useTasks();

  const [taskContent, setTaskContent] = useState<Task>({
    name: "",
    complete: false,
    id: nanoid(),
    date: "",
  });

  const [isNewTaskMenuOpen, setIsNewTaskMenuOpen] = useState(false);

  const isNoUser = tasksContext?.userFromDB?.data().tasks === undefined;

  const sortedTasks = tasksContext!.allTasks
    .filter((task: Task) =>
      isSameDay(new Date(task.date), new Date(tasksContext!.dayToShowTasks))
    )
    ?.sort((a: Task, b: Task) => +isAfter(new Date(a.date), new Date(b.date)))
    .map((task: Task, index: number) => (
      <Task
        task={task}
        key={index}
        setIsNewTaskMenuOpen={setIsNewTaskMenuOpen}
        setTaskContent={() => setTaskContent(task)}
      />
    ));

  const chosenDay = format(
    new Date(tasksContext!.dayToShowTasks),
    "dd/MM/yyyy"
  );

  const dispatch = useTasksDispatch();

  useEffect(() => {
    fetchUserData(dispatch, user);
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        px: { xs: 2, md: 0, lg: 0, sm: 0 },
      }}
    >
      {isNoUser ? (
        <StyledPuffLoader />
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
            <NewTaskWrapper
              taskContent={taskContent}
              setTaskContent={setTaskContent}
              isNewTaskMenuOpen={isNewTaskMenuOpen}
              setIsNewTaskMenuOpen={setIsNewTaskMenuOpen}
            />
          </Box>
          {sortedTasks}
        </>
      )}
    </Container>
  );
};

export default TaskWrapper;
