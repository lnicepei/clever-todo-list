import { Stack } from "@mui/system";
import {
  addDays,
  addMonths,
  endOfMonth,
  isAfter,
  isBefore,
  startOfMonth,
  subDays,
  subMonths,
} from "date-fns";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useTasks, useTasksDispatch } from "../TasksContext/TasksContext";
import Day from "../CalendarDay/CalendarDay";
import useDrag from "./hooks/useDrag";

const ScrollableCalendar = () => {
  const {
    dragStart,
    touchStart,
    dragStop,
    dragMove,
    touchMove,
    dragging,
    wheelMove,
  } = useDrag();
  const tasksContext = useTasks();
  const dispatch = useTasksDispatch();

  const dayRef = useRef<null | HTMLDivElement>(null);
  const scrollMenuRef = useRef<null | HTMLDivElement>(null);
  const initialDayRef = useRef<null | HTMLDivElement>(null);

  const [calendar, setCalendar] = useState<string[]>([]);
  const [selected, setSelected] = useState<number>(0);

  const appendMonthToCalendar = () => {
    const tempCalendar: string[] = [];
    let dayToAppend = new Date(calendar?.at(-1) ?? "");
    const endDay = addMonths(dayToAppend, 1);

    while (isBefore(dayToAppend, endDay)) {
      tempCalendar.push(addDays(dayToAppend, 1).toDateString());
      dayToAppend = addDays(dayToAppend, 1);
    }

    setCalendar((prevCalendar) => prevCalendar.concat(tempCalendar));
  };

  const prependMonthToCalendar = () => {
    const tempCalendar: string[] = [];
    let dayToPrepend = new Date(calendar?.at(0) ?? "");
    const startDay = subMonths(dayToPrepend, 1);

    while (isAfter(dayToPrepend, startDay)) {
      tempCalendar.unshift(subDays(dayToPrepend, 1).toDateString());
      dayToPrepend = subDays(dayToPrepend, 1);
    }

    flushSync(() => {
      const indexOfChosenDay = calendar.indexOf(tasksContext!.dayToShowTasks);
      setCalendar((prevCalendar) => tempCalendar.concat(prevCalendar));
      setSelected(tempCalendar.length + indexOfChosenDay);
    });
  };

  const moveAction = (positionDifference: number) => {
    if (scrollMenuRef.current) {
      scrollMenuRef.current.scrollLeft += positionDifference;

      if (
        scrollMenuRef.current.scrollLeft + scrollMenuRef.current.clientWidth >=
        scrollMenuRef.current?.scrollWidth
      ) {
        appendMonthToCalendar();
      }

      if (scrollMenuRef.current.scrollLeft === 0) {
        const prevWidth = scrollMenuRef.current.scrollWidth;
        prependMonthToCalendar();
        scrollMenuRef.current.scrollLeft =
          scrollMenuRef.current.scrollWidth - prevWidth;
      }
    }
  };

  const handleDayCardClick = (key: number) => () => {
    if (dragging) {
      return false;
    }

    dispatch?.({
      type: "SET_DAY_TO_SHOW_TASKS",
      payload: {
        dayToShowTasks: calendar[key],
      },
    });
    setSelected(selected !== key ? key : selected);
  };

  useEffect(() => {
    setSelected(calendar.indexOf(tasksContext!.dayToShowTasks));
  }, []);

  useEffect(() => {
    const tempCalendar: string[] = [];
    let startDay = startOfMonth(subMonths(new Date(), 1));

    while (isBefore(startDay, endOfMonth(new Date()))) {
      tempCalendar.push(startDay.toDateString());
      startDay = addDays(startDay, 1);
    }

    setSelected(tempCalendar.indexOf(new Date().toDateString()));
    setCalendar(tempCalendar);
  }, []);

  useEffect(() => {
    initialDayRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
    });
  }, [scrollMenuRef.current]);

  scrollMenuRef.current?.addEventListener("wheel", (e) => {
    e.preventDefault();
  });

  return (
    <Stack
      onMouseDown={dragStart}
      onMouseUp={dragStop}
      onTouchStart={touchStart}
      onTouchEnd={dragStop}
      onTouchMove={(e) => touchMove(e, moveAction)}
      onMouseMove={(e) => dragMove(e, moveAction)}
      onWheel={(e) => wheelMove(e, moveAction)}
      ref={scrollMenuRef}
      sx={{ overflow: "hidden", py: "10px" }}
      direction="row"
    >
      {calendar.map((dayOfMonth, key) => (
        <Day
          day={dayOfMonth}
          key={key}
          onClick={handleDayCardClick(key)}
          selected={key === selected}
          dayRef={
            dayOfMonth === new Date().toDateString() ? initialDayRef : dayRef
          }
          date={new Date(calendar?.at(key) ?? "")}
        />
      ))}
    </Stack>
  );
};

export default ScrollableCalendar;