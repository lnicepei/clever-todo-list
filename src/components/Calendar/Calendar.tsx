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
import Day from "../CalendarDay/CalendarDay";
import { useTasks, useTasksDispatch } from "../TasksContext/TasksContext";

const ScrollableCalendar = () => {
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
      let indexOfChosenDay = 0;
      setCalendar((prevCalendar) => {
        indexOfChosenDay = prevCalendar.indexOf(
          new Date(tasksContext!.dayToShowTasks).toDateString()
        );
        setSelected(tempCalendar.length + indexOfChosenDay);
        return tempCalendar.concat(prevCalendar);
      });
    });
  };

  const handleDayCardClick = (key: number) => () => {
    dispatch?.({
      type: "SET_DAY_TO_SHOW_TASKS",
      payload: {
        dayToShowTasks: calendar[key],
      },
    });
    setSelected(selected !== key ? key : selected);
  };

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
    scrollMenuRef.current?.addEventListener("scroll", () => {
      if (scrollMenuRef.current) {
        if (
          scrollMenuRef.current.scrollLeft +
            scrollMenuRef.current.clientWidth >=
          scrollMenuRef.current?.scrollWidth - 200
        ) {
          appendMonthToCalendar();
        }

        if (scrollMenuRef.current.scrollLeft <= 150) {
          const prevWidth = scrollMenuRef.current.scrollWidth;
          prependMonthToCalendar();
          scrollMenuRef.current.scrollLeft =
            scrollMenuRef.current.scrollWidth - prevWidth;
        }
      }
    });

    scrollMenuRef.current?.addEventListener("wheel", (e) => {
      e.preventDefault();
    });

    initialDayRef.current?.scrollIntoView({
      behavior: "auto",
      inline: "center",
    });
  }, [scrollMenuRef.current]);

  const selectDayRef = (day: string) => {
    return day === new Date().toDateString() ? initialDayRef : dayRef;
  };

  const wheelMove = (difference: number) => {
    if (scrollMenuRef.current) scrollMenuRef.current.scrollLeft += difference;
  };

  return (
    <Stack
      onWheel={(e) => wheelMove(e.deltaY)}
      ref={scrollMenuRef}
      sx={{ overflow: "auto", py: "10px", scrollbarWidth: "none" }}
      direction="row"
    >
      {calendar.map((dayOfMonth, key) => (
        <Day
          day={dayOfMonth}
          key={key}
          onClick={handleDayCardClick(key)}
          selected={key === selected}
          dayRef={selectDayRef(dayOfMonth)}
          date={new Date(calendar?.at(key) ?? "")}
        />
      ))}
    </Stack>
  );
};

export default ScrollableCalendar;
