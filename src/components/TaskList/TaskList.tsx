import { format, isAfter, isPast, isSameDay, isToday } from "date-fns";
import { User } from "firebase/auth";
import { nanoid } from "nanoid";

import { useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";

import { fetchUserData } from "../../api/firebase";
import CustomPuffLoader from "../../helpers/PuffLoader/PuffLoader";
import NewTaskDialog from "../NewTaskDialog/NewTaskDialog";
import Task from "../Task/Task";
import { useTasks, useTasksDispatch } from "../TasksContext/TasksContext";
import {
  StyledDayDescription,
  StyledTaskListContainer,
  StyledTasksInfoBox,
} from "./style";

type TaskWrapperProps = {
  user: User | null | undefined;
};

const TaskWrapper: React.FC<TaskWrapperProps> = ({ user }) => {
  const tasksContext = useTasks();
  const [wasNewTaskDialogEmpty, setWasNewTaskDialogEmpty] = useState(false);

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
    .map((task: Task) => (
      <Task
        task={task}
        key={task.id}
        setIsNewTaskMenuOpen={setIsNewTaskMenuOpen}
        setTaskContent={() => setTaskContent(task)}
      />
    ));

  const chosenDay = format(
    new Date(tasksContext!.dayToShowTasks),
    "dd/MM/yyyy"
  );

  const dispatch = useTasksDispatch();

  const handleTaskDialogClose = () => {
    setTaskContent({
      name: "",
      date: "",
      complete: false,
      id: nanoid(),
    });
    setIsNewTaskMenuOpen(false);
    setWasNewTaskDialogEmpty(false);
  };

  const handleTaskDialogOpen = () => {
    setWasNewTaskDialogEmpty(true);
    setIsNewTaskMenuOpen(true);
  };

  const isNewTaskVisible =
    !isPast(new Date(tasksContext!.dayToShowTasks)) ||
    isToday(new Date(tasksContext!.dayToShowTasks));

  const isSOnTheEnd = sortedTasks.length > 1 || sortedTasks.length === 0;

  useEffect(() => {
    fetchUserData(dispatch, user);
  }, []);

  return (
    <StyledTaskListContainer>
      {isNoUser ? (
        <CustomPuffLoader />
      ) : (
        <>
          <StyledTasksInfoBox>
            <StyledDayDescription variant="h5">
              {sortedTasks.length || "No"} task
              {isSOnTheEnd && "s"} for {chosenDay}
            </StyledDayDescription>
            {isNewTaskVisible && (
              <IconButton onClick={handleTaskDialogOpen}>
                <AddIcon />
              </IconButton>
            )}
            <NewTaskDialog
              taskContent={taskContent}
              setTaskContent={setTaskContent}
              isNewTaskMenuOpen={isNewTaskMenuOpen}
              setIsNewTaskMenuOpen={setIsNewTaskMenuOpen}
              wasNewTaskDialogEmpty={wasNewTaskDialogEmpty}
              handleTaskDialogClose={handleTaskDialogClose}
            />
          </StyledTasksInfoBox>
          {sortedTasks}
        </>
      )}
    </StyledTaskListContainer>
  );
};

export default TaskWrapper;
