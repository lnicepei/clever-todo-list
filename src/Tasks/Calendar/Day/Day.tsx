import { Card, CardContent, Container, Typography } from "@mui/material";
import { format, isPast, isToday } from "date-fns";
import { MutableRefObject } from "react";
import { useTasks } from "../../TasksContext";
import "./Day.css";

type DayProps = {
  day: string;
  onClick: () => false | undefined;
  selected: boolean;
  dayRef: MutableRefObject<HTMLDivElement | null>;
  date: Date;
};

const Day: React.FC<DayProps> = ({ day, onClick, selected, dayRef, date }) => {
  const tasksContext = useTasks();

  const formattedMonth = format(new Date(day), "E");
  const formattedDay = format(new Date(day), "d");

  const taskList =
    tasksContext?.allTasks.some(
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
    ));

  const cardStyles = {
    bgcolor:
      (isToday(date) && "text.primary") ||
      (isPast(date) && "secondary.light") ||
      "secondary.dark",
    outline: (selected && "2px solid") || "none",
    color:
      (selected && "warning.dark") ||
      (isToday(date) && "background.default") ||
      (!isToday(date) && isPast(date) && "text.disabled") ||
      "text.primary",
  };

  return (
    <Card variant="outlined" onClick={onClick} ref={dayRef} sx={cardStyles}>
      <CardContent>
        <Typography>{formattedMonth}</Typography>
        <Typography>{formattedDay}</Typography>
        <Container>{taskList}</Container>
      </CardContent>
    </Card>
  );
};

export default Day;
