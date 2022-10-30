import { addDays, isBefore, startOfMonth, subDays } from "date-fns";
import { endOfMonth } from "date-fns/esm";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "./Calendar.css";
import Day from "../Day/Day";
import useDrag from "../UseDrag";
import { TasksContext } from "../../Tasks";

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const Calendar = () => {
  const startDay = startOfMonth(new Date());
  let endDay = endOfMonth(new Date());
  let day = subDays(startDay, 1);
  const tempCalendar: string[] = [];
  const { dragStart, dragStop, dragMove, dragging } = useDrag();
  const tasksContext = useContext(TasksContext);
  const todayRef = useRef<null | HTMLDivElement>(null);
  const scrollMenuRef = useRef({} as scrollVisibilityApiType);
  const [calendar, setCalendar] = useState<string[]>([]);
  const [selected, setSelected] = useState<number>(
    tempCalendar.indexOf(new Date().toDateString())
  );

  const updateCalendar = () => {
    if (
      scrollMenuRef.current.visibleElements.includes(
        scrollMenuRef.current.items.toItems().at(-5) || ""
      )
    ) {
      tempCalendar.length = 0;
      endDay = addDays(endDay, 30);
      add30DaysToCalendar();
      setCalendar((prevCalendar) => prevCalendar.concat(tempCalendar));
    }
  };

  const add30DaysToCalendar = () => {
    while (isBefore(day, endDay)) {
      tempCalendar.push(addDays(day, 1).toDateString());
      day = addDays(day, 1);
    }
  };

  const handleDrag =
    ({ scrollContainer }: scrollVisibilityApiType) =>
    (ev: React.MouseEvent) =>
      dragMove(ev, (posDiff) => {
        if (scrollContainer.current) {
          updateCalendar();
          scrollContainer.current.scrollLeft += posDiff;
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
    add30DaysToCalendar();
    setCalendar(tempCalendar);
  }, []);

  useEffect(() => {
    todayRef?.current?.scrollIntoView({ behavior: "smooth", inline: "center" });
  }, []);

  return (
    <ScrollMenu
      onMouseDown={() => dragStart}
      onMouseUp={() => dragStop}
      onMouseMove={handleDrag}
      apiRef={scrollMenuRef}
    >
      {calendar.map((dayOfMonth, key) => (
        <Day
          day={dayOfMonth}
          key={key}
          onClick={handleItemClick(key)}
          selected={key === selected}
          todayRef={key === selected ? todayRef : null}
        />
      ))}
    </ScrollMenu>
  );
};

export default Calendar;
