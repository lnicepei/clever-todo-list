import { addDays, addMonths, isBefore, subDays } from "date-fns";
import { endOfMonth } from "date-fns/esm";
import React, { useContext, useEffect, useRef, useState } from "react";
import { TasksContext } from "../../Tasks";
import Day from "../Day/Day";
import "./ScrollableCalendar.css";
import useDrag from "./UseDrag";


const ScrollableCalendar = () => {
  const { dragStart, touchStart, dragStop, dragMove, dragMoveTouch, dragging } =
    useDrag();
  const tasksContext = useContext(TasksContext);

  const [startDay, setStartDay] = useState(new Date());
  const [endDay, setEndDay] = useState(endOfMonth(new Date()));
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

  const handleDrag =
    (ev: React.MouseEvent | React.TouchEvent) =>
      !ev?.changedTouches?.length
        ? dragMove(ev, (posDiff) => {
            if (scrollMenuRef.current) {
              scrollMenuRef.current.scrollLeft += posDiff;
            }
          })
        : dragMoveTouch(ev, (posDiff) => {
            if (scrollMenuRef.current) {
              scrollMenuRef.current.scrollLeft += posDiff;
            }
          });

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
    <div>
      <div
        onMouseDown={dragStart}
        onMouseUp={dragStop}
        onTouchStart={(e) => touchStart(e)}
        onTouchEnd={dragStop}
        onTouchMove={(e) => handleDrag(e)}
        onMouseMove={(e) => handleDrag(e)}
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
    </div>
  );
};

export default ScrollableCalendar;
