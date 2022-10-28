import Task from "../Task/Task";

const TaskView = ({ tasks }: { tasks: Task[] }) => {
  return (
    <>
      {tasks?.length
        ? tasks?.map((task: Task, index: number) => (
            <Task task={task} key={index} />
          ))
        : "No tasks for today"}
    </>
  );
};

export default TaskView;
