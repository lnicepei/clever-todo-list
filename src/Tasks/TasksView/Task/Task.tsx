import { format } from "date-fns";
import React from "react";

declare global {
  interface Task {
    name: string;
    date: string;
    complete: boolean;
  }
}

const Task = ({ content }) => {
  return (
    <div>
      {content.name}:{`${format(new Date(content.date), "MMM")}`}:{`${content.complete}`}
    </div>
  );
};

export default Task;
