import { Container } from "@mui/system";
import { isAfter, isSameDay } from "date-fns";
import { useContext } from "react";
import { PuffLoader } from "react-spinners";
import { TasksContext } from "../../Tasks";
import Task from "../Task/Task";

const TaskView = () => {
  const tasksContext = useContext(TasksContext);

  return (
    <>
      {tasksContext?.userFromDB?.data().tasks === undefined ? (
        <Container
          sx={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <PuffLoader />
        </Container>
      ) : tasksContext!.allTasks.filter((task: Task) =>
          isSameDay(new Date(task.date), new Date(tasksContext.dayToShowTasks))
        ).length === 0 ? (
        `No tasks for ${tasksContext?.dayToShowTasks}`
      ) : (
        tasksContext!.allTasks
          .filter((task: Task) =>
            isSameDay(
              new Date(task.date),
              new Date(tasksContext.dayToShowTasks)
            )
          )
          ?.sort(
            (a: Task, b: Task) => +isAfter(new Date(a.date), new Date(b.date))
          )
          .map((task: Task, index: number) => <Task task={task} key={index} />)
      )}
    </>
  );
};

export default TaskView;
