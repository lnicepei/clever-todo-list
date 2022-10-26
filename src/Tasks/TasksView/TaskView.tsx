import Task from "./Task";

const TaskView = ({ tasks }) => {
  console.log(tasks);
  return (
    <>
      {tasks?.length
        ? tasks?.map((task, index) => <Task content={task} key={index} />)
        : "Loading..."}
    </>
  );
};

export default TaskView;
