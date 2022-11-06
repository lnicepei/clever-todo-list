import { Card, CardContent, Typography } from "@mui/material";
import { format, isPast, isToday } from "date-fns";
import { MutableRefObject, useContext } from "react";
import { TasksContext } from "../../Tasks";
import "./Day.css";

type DayProps = {
  day: string;
  onClick: () => false | undefined;
  selected: boolean;
  dayRef: MutableRefObject<HTMLDivElement | null>;
  date: Date;
};

const Day: React.FC<DayProps> = ({ day, onClick, selected, dayRef, date }) => {
  const tasksContext = useContext(TasksContext);

  return (
    <Card
      variant="outlined"
      onClick={() => onClick()}
      ref={dayRef}
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "18px",
        margin: "0 5px",
        overflow: "visible",
        userSelect: "none",
        boxSizing: "border-box",
        backgroundColor:
          (isToday(date) && "black") || (isPast(date) && "#797a7c33") || "",
        outline: (selected && "2px solid #ffa781") || "",
        color:
          (selected && "#ff8181") ||
          (isToday(date) && "white") ||
          (!isToday(date) && isPast(date) && "#898687") ||
          "",
      }}
    >
      <CardContent
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          cursor: "pointer",
          height: "65px",
          width: "55px",
        }}
      >
        <Typography>{format(new Date(day), "E")}</Typography>
        <Typography>{format(new Date(day), "d")}</Typography>
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
      </CardContent>
    </Card>
  );
};

export default Day;
