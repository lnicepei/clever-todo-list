import { format } from "date-fns";

import { MutableRefObject } from "react";

import { Container, Typography } from "@mui/material";

import { useTasks } from "../TasksContext/TasksContext";
import { CalendarDayCard, CalendarDayCardContent } from "./style";

type DayProps = {
  day: string;
  onClick: () => void;
  selected: boolean;
  dayRef: MutableRefObject<HTMLDivElement | null>;
  date: Date;
};

const CalendarDay: React.FC<DayProps> = ({
  day,
  onClick,
  selected,
  dayRef,
  date,
}) => {
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

  return (
    <CalendarDayCard
      variant="outlined"
      onClick={onClick}
      ref={dayRef}
      selected={selected}
      date={date}
    >
      <CalendarDayCardContent>
        <Typography>{formattedMonth}</Typography>
        <Typography>{formattedDay}</Typography>
        <Container>{taskList}</Container>
      </CalendarDayCardContent>
    </CalendarDayCard>
  );
};

export default CalendarDay;
