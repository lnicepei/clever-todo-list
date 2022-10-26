import { format } from "date-fns";
import React from "react";

const Task = ({ content }) => {
  return (
    <div>
      {content.name}:{`${format(new Date(content.date), "MMM")}`}:{`${content.complete}`}
    </div>
  );
};

export default Task;
