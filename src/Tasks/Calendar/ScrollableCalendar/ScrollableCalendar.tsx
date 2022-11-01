import { addDays, addMonths, isBefore, subDays } from "date-fns";
import { endOfMonth } from "date-fns/esm";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { TasksContext } from "../../Tasks";
import Day from "../Day/Day";
import useDrag from "../UseDrag";
import "./ScrollableCalendar.css";

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const ScrollableCalendar = () => {
  const { dragStart, dragStop, dragMove, dragging } = useDrag();
  const tasksContext = useContext(TasksContext);

  const [startDay, setStartDay] = useState(new Date());
  const [endDay, setEndDay] = useState(endOfMonth(new Date()));
  let day = subDays(startDay, 1);

  let tempCalendar: string[] = [];

  const dayRef = useRef<null | HTMLDivElement>(null);
  const scrollMenuRef = useRef({} as scrollVisibilityApiType);

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
    ({ scrollContainer }: scrollVisibilityApiType) =>
    (ev: React.MouseEvent) =>
      dragMove(ev, (posDiff) => {
        if (
          scrollContainer.current &&
          scrollMenuRef.current.items.toArr().at(-1)
        ) {
          if (scrollMenuRef.current.items.toArr().at(-1)[1].visible === true) {
            appendMonthToCalendar();
            scrollMenuRef.current.items.toArr().at(-1)[1].visible = false;
          }

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
    appendMonthToCalendar();
    setCalendar(tempCalendar);
  }, []);

  return (
    <div onMouseLeave={dragStop}>
      <ScrollMenu
        onMouseDown={() => dragStart}
        onMouseUp={() => dragStop}
        onMouseMove={handleDrag}
        apiRef={scrollMenuRef}
        onInit={() => appendMonthToCalendar()}
      >
        {calendar.map((dayOfMonth, key) => (
          <Day
            day={dayOfMonth}
            key={key}
            onClick={handleItemClick(key)}
            selected={key === selected}
            dayRef={dayRef}
            date={new Date(calendar?.at(key) ?? "")}
            // onPointerDown={() => dragStart}
            // onPointerDownCapture={() => dragStart}
            // onPointerMove={() => handleDrag}
            // onPointerUp={() => dragStop}
          />
        ))}
      </ScrollMenu>
    </div>
  );
};

export default ScrollableCalendar;
