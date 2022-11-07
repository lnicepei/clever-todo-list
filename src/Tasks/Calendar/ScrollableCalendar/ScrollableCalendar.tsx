import { Stack } from "@mui/system";
import {
  addDays,
  addMonths,
  isBefore,
  subDays,
  endOfMonth,
  subMonths,
  isAfter,
  startOfMonth,
} from "date-fns";
import { useContext, useEffect, useRef, useState } from "react";
import { TasksContext } from "../../Tasks";
import Day from "../Day/Day";
import useDrag from "./UseDrag";

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
  const tasksContext = useContext(TasksContext);

  const dayRef = useRef<null | HTMLDivElement>(null);
  const scrollMenuRef = useRef<null | HTMLDivElement>(null);
  const initialDayRef = useRef<null | HTMLDivElement>(null);
  // const widthRef = useRef<number>(0);

  const [calendar, setCalendar] = useState<string[]>([]);
  const [selected, setSelected] = useState<number>(0);

  const appendMonthToCalendar = () => {
    const tempCalendar: string[] = [];
    let dayToAppend = new Date(calendar?.at(-1) ?? "");
    let endDay = addMonths(dayToAppend, 1);

    while (isBefore(dayToAppend, endDay)) {
      tempCalendar.push(addDays(dayToAppend, 1).toDateString());
      dayToAppend = addDays(dayToAppend, 1);
    }

    setCalendar((prevCalendar) => prevCalendar.concat(tempCalendar));
  };

  const prependMonthToCalendar = () => {
    const tempCalendar: string[] = [];
    let dayToPrepend = new Date(calendar?.at(0) ?? "");
    let startDay = subMonths(dayToPrepend, 1);

    while (isAfter(dayToPrepend, startDay)) {
      tempCalendar.unshift(subDays(dayToPrepend, 1).toDateString());
      dayToPrepend = subDays(dayToPrepend, 1);
    }

    setCalendar((prevCalendar) => tempCalendar.concat(prevCalendar));
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
        prependMonthToCalendar();
        // scrollMenuRef.current.scrollLeft += 1308;
      }
    }
  };

  // useEffect(() => {
  //   scrollMenuRef.current.scrollLeft += 1308;
  // }, [calendar.length]);

  const handleDayCardClick = (key: number) => () => {
    if (dragging) {
      return false;
    }

    tasksContext!.setDayToShowTasks(calendar[key]);
    setSelected(selected !== key ? key : selected);
  };

  useEffect(() => {
    setSelected(
      calendar.indexOf(
        new Date(tasksContext?.dayToShowTasks ?? "").toDateString()
      )
    );
  }, [calendar]);

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
      style={{ overflow: "hidden", padding: "10px 0" }}
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
