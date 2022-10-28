import { format } from "date-fns";

declare global {
  interface Task {
    name: string;
    date: string;
    complete: boolean;
  }
}

const Task = ({ task }: { task: Task }) => {
  return (
    <div>
      {task.name}:{`${format(new Date(task.date), "MMM")}`}:
      {`${task.complete}`}
    </div>
  );
};

export default Task;
