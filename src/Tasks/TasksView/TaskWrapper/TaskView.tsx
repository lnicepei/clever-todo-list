import { isAfter } from "date-fns";
import { useContext } from "react";
import { TasksContext } from "../../Tasks";
import Task from "../Task/Task";

const TaskView = () => {
  const tasksContext = useContext(TasksContext);

  return (
    <>
      {tasksContext!.tasksFromDay?.length
        ? tasksContext!.tasksFromDay
            ?.sort((a, b) => +isAfter(new Date(a.date), new Date(b.date)))
            .map((task: Task, index: number) => (
              <Task task={task} key={index} />
            ))
        : `No tasks for ${tasksContext?.dayToShowTasks}`}
    </>
  );
};

export default TaskView;
