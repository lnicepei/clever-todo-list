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

  // const [startDay, setStartDay] = useState(startOfMonth(new Date()));
  // let startDay = startOfMonth(new Date());
  // const startDay = subMonths(new Date(), 0);
  // const [endDay, setEndDay] = useState(addMonths(endOfMonth(new Date()), 1));
  // let endDay = endOfMonth(new Date());

  // let dayToPrepend = addDays(startDay, 1);

  // let tempCalendar: string[] = [];

  const dayRef = useRef<null | HTMLDivElement>(null);
  const scrollMenuRef = useRef<null | HTMLDivElement>(null);
  const initialDayRef = useRef<null | HTMLDivElement>(null);
  // const widthRef = useRef<number>(0);

  const [calendar, setCalendar] = useState<string[]>([]);
  const [selected, setSelected] = useState<number>(0);

  const setInitialCalendar = () => {
    const tempCalendar: string[] = [];
    let startDay = startOfMonth(subMonths(new Date(), 0));

    while (isBefore(startDay, endOfMonth(new Date()))) {
      tempCalendar.push(startDay.toDateString());
      startDay = addDays(startDay, 1);
    }

    setCalendar(tempCalendar);
  };

  const appendMonthToCalendar = () => {
    const tempCalendar: string[] = [];
    // let endDay = new Date(calendar.at(-1));
    let dayToAppend = new Date(calendar?.at(-1) ?? "");
    let endDay = addMonths(dayToAppend, 1);

    while (isBefore(dayToAppend, endDay)) {
      tempCalendar.push(addDays(dayToAppend, 1).toDateString());
      dayToAppend = addDays(dayToAppend, 1);
    }
    //display fixed for parent element
    console.log("TempCalendar", tempCalendar);

    // console.log("TempCalendar: ", tempCalendar);

    setCalendar((prevCalendar) => prevCalendar.concat(tempCalendar));
  };

  // const prependMonthToCalendar = () => {
  // // setStartDay((prevStartDay) => subMonths(prevStartDay, 1));
  // startDay = subMonths(startDay, 1);
  // const tempCalendar: string[] = [];
  // console.log(dayToPrepend, subMonths(startDay, 1));
  // while (isAfter(dayToPrepend, startDay)) {
  //   tempCalendar.unshift(subDays(dayToPrepend, 1).toDateString());
  //   dayToPrepend = subDays(dayToPrepend, 1);
  // }
  // setCalendar((prevCalendar) => prevCalendar.concat(tempCalendar));
  // };

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

  const dragAction = (positionDifference: number) => {
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
        scrollMenuRef.current.scrollLeft += 1308;
      }
    }
  };

  // useEffect(() => {
  //   scrollMenuRef.current.scrollLeft += 1308;
  // }, [calendar.length]);

  const handleItemClick = (key: number) => () => {
    if (dragging) {
      return false;
    }

    tasksContext!.setDayToShowTasks(calendar[key]);
    setSelected(selected !== key ? key : selected);
  };

  useEffect(() => {
    // appendMonthToCalendar();
    setInitialCalendar();
    // prependMonthToCalendar();
    // setSelected(tempCalendar.indexOf(new Date().toDateString()));
    // setCalendar(tempCalendar);
  }, []);

  // useEffect(() => {
  //   initialDayRef.current?.scrollIntoView({
  //     behavior: "smooth",
  //     inline: "center",
  //   });
  // }, [initialDayRef.current]);

  return (
    <Stack
      onMouseDown={dragStart}
      onMouseUp={dragStop}
      onTouchStart={touchStart}
      onTouchEnd={dragStop}
      onTouchMove={(e) => touchMove(e, dragAction)}
      onMouseMove={(e) => dragMove(e, dragAction)}
      onWheel={(e) => wheelMove(e, dragAction)}
      ref={scrollMenuRef}
      style={{ overflow: "hidden", padding: "10px 0" }}
      direction="row"
    >
      {calendar.map((dayOfMonth, key) => (
        <Day
          day={dayOfMonth}
          key={key}
          onClick={handleItemClick(key)}
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
