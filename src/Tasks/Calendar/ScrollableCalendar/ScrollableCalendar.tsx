import { addDays, addMonths, isBefore, subDays } from "date-fns";
import { endOfMonth } from "date-fns/esm";
import React, { useContext, useEffect, useRef, useState } from "react";
import { TasksContext } from "../../Tasks";
import Day from "../Day/Day";
import useDrag from "./UseDrag";

const ScrollableCalendar = () => {
  const { dragStart, touchStart, dragStop, dragMove, dragMoveTouch, dragging } =
    useDrag();
  const tasksContext = useContext(TasksContext);

  const [startDay, setStartDay] = useState(new Date());
  const [endDay, setEndDay] = useState(addMonths(endOfMonth(new Date()), 1));
  let day = subDays(startDay, 1);

  let tempCalendar: string[] = [];

  const dayRef = useRef<null | HTMLDivElement>(null);
  const scrollMenuRef = useRef<null | HTMLDivElement>(null);

  const [calendar, setCalendar] = useState<string[]>([]);
  const [selected, setSelected] = useState<number>(0);

  const appendMonthToCalendar = () => {
    setEndDay((prevEndDay) => addMonths(prevEndDay, 1));

    while (isBefore(day, endDay)) {
      tempCalendar.push(addDays(day, 1).toDateString());
      day = addDays(day, 1);
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
    setCalendar(tempCalendar);
  }, []);

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
          dayRef={dayRef}
          date={new Date(calendar?.at(key) ?? "")}
        />
      ))}
    </div>
  );
};

export default ScrollableCalendar;
