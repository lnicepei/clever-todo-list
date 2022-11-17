import { Card, CardContent, Container, Typography } from "@mui/material";
import { format, isPast, isToday } from "date-fns";
import { MutableRefObject } from "react";
import { useTasks } from "../TasksContext/TasksContext";
import "./CalendarDay.css";

type DayProps = {
  day: string;
  onClick: () => void;
  selected: boolean;
  dayRef: MutableRefObject<HTMLDivElement | null>;
  date: Date;
};

const Day: React.FC<DayProps> = ({ day, onClick, selected, dayRef, date }) => {
  const tasksContext = useTasks();

  const formattedMonth = format(new Date(day), "E");
  const formattedDay = format(new Date(day), "d");

  const areAnyTasks = tasksContext?.allTasks.some(
    (task) => task.date.substring(0, day.length) === day
  );

  const areAnyNotCompletedTasks = tasksContext?.allTasks
    .filter((task) => task.date.substring(0, day.length) === day)
    .some((task) => !task.complete);

  const areAnyCompletedTask = tasksContext?.allTasks
    .filter((task) => task.date.substring(0, day.length) === day)
    .some((task) => task.complete);

  const taskList =
    areAnyTasks &&
    (areAnyNotCompletedTasks ? (
      areAnyCompletedTask ? (
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

  const selectBgColor = () => {
    if (isToday(date)) {
      return "text.primary";
    }

    if (isPast(date)) {
      return "secondary.light";
    }

    return "secondary.dark";
  };

  const selectColor = () => {
    if (selected) {
      return "warning.dark";
    }

    if (isToday(date)) {
      return "background.default";
    }

    if (!isToday(date) && isPast(date)) {
      return "text.disabled";
    }

    return "text.primary";
  };

  const cardStyles = {
    bgcolor: selectBgColor(),
    outline: (selected && "2px solid") || "none",
    color: selectColor(),
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
