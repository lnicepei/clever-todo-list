import { Container } from "@mui/system";
import { isAfter, isSameDay } from "date-fns";
import { useContext } from "react";
import { PuffLoader } from "react-spinners";
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

  const areNoTasks =
    tasksContext!.allTasks.filter((task: Task) =>
      isSameDay(new Date(task.date), new Date(tasksContext!.dayToShowTasks))
    ).length === 0;

  return (
    <Container sx={{ p: { xs: 2, md: 0, lg: 0, sm: 0 } }}>
      {isNoUser ? (
        <PuffLoader />
      ) : areNoTasks ? (
        `No tasks for ${tasksContext?.dayToShowTasks}`
      ) : (
        sortedTasks
      )}
    </Container>
  );
};

export default TaskView;
