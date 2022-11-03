import { useContext } from "react";
import { TasksContext } from "../../Tasks";
import Task from "../Task/Task";

const TaskView = () => {
  const tasksContext = useContext(TasksContext);

  return (
    <>
      {tasksContext!.tasksFromDay?.length
        ? tasksContext!.tasksFromDay?.map((task: Task, index: number) => (
            <Task task={task} key={index} />
          ))
        : `No tasks for ${tasksContext?.dayToShowTasks}`}
    </>
  );
};

export default TaskView;
