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
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "5px",
        borderRadius: "15px",
        overflow: "visible",
        userSelect: "none",
        backgroundColor:
          (isToday(date) && "black") || (isPast(date) && "#eaebed") || "",
        outline: (selected && "2px solid #ffa781") || "",
        color:
          (isToday(date) && "white") ||
          (!isToday(date) && isPast(date) && "#524e4f") ||
          (selected && "#ffa781") ||
          "",
      }}
      ref={dayRef}
    >
      <CardContent
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: "20px",
          height: "3vh",
          cursor: "pointer",
        }}
      >
        <Typography color={"#cbcbcb"}>{format(new Date(day), "E")}</Typography>
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
