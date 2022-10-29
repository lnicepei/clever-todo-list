import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import React from "react";
import Task from "../Task/Task";

interface TaskViewProps {
  tasksFromDay: Task[];
  userFromDB: QueryDocumentSnapshot<DocumentData> | undefined;
  setAllTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskView = ({
  tasksFromDay,
  userFromDB,
  setAllTasks,
  allTasks,
}: TaskViewProps) => {
  return (
    <>
      {tasksFromDay?.length
        ? tasksFromDay?.map((task: Task, index: number) => (
            <Task
              task={task}
              key={index}
              userFromDB={userFromDB}
              setAllTasks={setAllTasks}
              allTasks={allTasks}
            />
          ))
        : tasksFromDay.length === 0 && userFromDB
        ? "No tasks for today"
        : "Loading..."}
    </>
  );
};

export default TaskView;
