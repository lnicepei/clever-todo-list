import { Card } from "@mui/material";
import { format, isPast, isToday } from "date-fns";
import { MutableRefObject, useContext } from "react";
import { TasksContext } from "../../Tasks";
import "./Day.css";

interface DayProps {
  day: string;
  onClick: () => false | undefined;
  selected: boolean;
  dayRef: MutableRefObject<HTMLDivElement | null>;
  date: Date;
}

const Day = ({ day, onClick, selected, dayRef, date }: DayProps) => {
  const tasksContext = useContext(TasksContext);
  return (
    <Card
      variant="outlined"
      onClick={() => onClick()}
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "7vh",
        height: "8vh",
        margin: "5px",
        borderRadius: "10px",
        cursor: "pointer",
        userSelect: "none",
        backgroundColor:
          (isToday(date) && "#1976d2") || (isPast(date) && "#eaebed") || "",
        outline: (selected && "2px solid red") || "",
        color: (!isToday(date) && isPast(date) && "#524e4f") || "",
      }}
      ref={dayRef}
    >
      <div>{format(new Date(day), "E")}</div>
      <div>{format(new Date(day), "d")}</div>
      {tasksContext?.allTasks.some(
        (task) => task.date.substring(0, day.length) === day
      ) &&
        (tasksContext?.allTasks
          .filter((task) => task.date.substring(0, day.length) === day)
          .some((task) => !task.complete) ? (
          tasksContext?.allTasks
            .filter((task) => task.date.substring(0, day.length) === day)
            .some((task) => task.complete) ? (
            <ul className="markers both">
              <li>&nbsp; &nbsp;</li>
              <li></li>
            </ul>
          ) : (
            <ul className="markers undone">
              <li>&nbsp; &nbsp;</li>
            </ul>
          )
        ) : (
          <ul className="markers done">
            <li>&nbsp; &nbsp;</li>
          </ul>
        ))}
    </Card>
  );
};

export default Day;
