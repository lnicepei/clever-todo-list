import { addDays, addMonths, isAfter, isBefore, subDays } from "date-fns";
import { endOfMonth, subMonths } from "date-fns/esm";
import { useContext, useEffect, useRef, useState } from "react";
import { TasksContext } from "../../Tasks";
import Day from "../Day/Day";
import useDrag from "./UseDrag";

const ScrollableCalendar = () => {
  const { dragStart, touchStart, dragStop, dragMove, dragMoveTouch, dragging } =
    useDrag();
  const tasksContext = useContext(TasksContext);

  const [startDay, setStartDay] = useState(subMonths(new Date(), 1));
  const [endDay, setEndDay] = useState(addMonths(endOfMonth(new Date()), 1));

  let dayToAppend = subDays(startDay, 1);
  let dayToPrepend = addDays(startDay, 1);

  let tempCalendar: string[] = [];

  const dayRef = useRef<null | HTMLDivElement>(null);
  const scrollMenuRef = useRef<null | HTMLDivElement>(null);
  const initialDayRef = useRef<null | HTMLDivElement>(null);

  const [calendar, setCalendar] = useState<string[]>([]);
  const [selected, setSelected] = useState<number>(0);

  const appendMonthToCalendar = () => {
    setEndDay((prevEndDay) => addMonths(prevEndDay, 1));

    while (isBefore(dayToAppend, endDay)) {
      tempCalendar.push(addDays(dayToAppend, 1).toDateString());
      dayToAppend = addDays(dayToAppend, 1);
    }

    setCalendar(tempCalendar);
  };

  const prependMonthToCalendar = () => {
    setStartDay((prevStartDay) => subMonths(prevStartDay, 1));

    while (isAfter(dayToPrepend, startDay)) {
      tempCalendar.unshift(subDays(dayToPrepend, 1).toDateString());
      dayToPrepend = subDays(dayToPrepend, 1);
    }

    setCalendar(tempCalendar);
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
        scrollMenuRef.current.scrollLeft += scrollMenuRef.current.scrollWidth;
        prependMonthToCalendar();
      }

      console.log(
        scrollMenuRef.current.scrollLeft,
        scrollMenuRef.current.clientWidth,
        scrollMenuRef.current?.scrollWidth
      );
    }
  };

  const handleItemClick = (key: number) => () => {
    if (dragging) {
      return false;
    }

    tasksContext!.setDayToShowTasks(calendar[key]);
    setSelected(selected !== key ? key : selected);
  };

  useEffect(() => {
    appendMonthToCalendar();
    setSelected(tempCalendar.indexOf(new Date().toDateString()));
    // prependMonthToCalendar();
    setCalendar(tempCalendar);
  }, []);

  useEffect(() => {
    initialDayRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
    });
  }, [initialDayRef.current]);

  return (
    <div
      onMouseDown={dragStart}
      onMouseUp={dragStop}
      onTouchStart={touchStart}
      onTouchEnd={dragStop}
      onTouchMove={(e) => dragMoveTouch(e, dragAction)}
      onMouseMove={(e) => dragMove(e, dragAction)}
      ref={scrollMenuRef}
      style={{ display: "flex", position: "relative", overflow: "hidden" }}
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
    </div>
  );
};

export default ScrollableCalendar;
