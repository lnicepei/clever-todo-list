import { addDays, isBefore, startOfMonth, subDays } from "date-fns";
import { endOfMonth } from "date-fns/esm";
import React, { useEffect, useRef, useState } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "./Calendar.css";
import Day from "../Day/Day";
import useDrag from "../UseDrag";

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const Calendar = ({ setDayToShowTasks }) => {
  const calendar: string[] = [];
  const startDay = startOfMonth(new Date());
  const endDay = endOfMonth(new Date());

  const todayRef = useRef(null);

  let day = subDays(startDay, 1);

  while (isBefore(day, endDay)) {
    calendar.push(addDays(day, 1).toDateString());
    day = addDays(day, 1);
  }

  const { dragStart, dragStop, dragMove, dragging } = useDrag();

  const handleDrag =
    ({ scrollContainer }: scrollVisibilityApiType) =>
    (ev: React.MouseEvent) =>
      dragMove(ev, (posDiff) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff;
        }
      });

  const [selected, setSelected] = useState<number>(
    calendar.indexOf(new Date().toDateString())
  );
  const handleItemClick = (key: number) => () => {
    if (dragging) {
      return false;
    }

    setDayToShowTasks(calendar[key]);
    setSelected(selected !== key ? key : selected);
  };

  useEffect(() => {
    todayRef?.current?.scrollIntoView({ behavior: "smooth", inline: "center" });
  }, []);

  return (
    <div style={{ overflow: "hidden" }} onMouseLeave={dragStop}>
      <ScrollMenu
        onMouseDown={() => dragStart}
        onMouseUp={() => dragStop}
        onMouseMove={handleDrag}
        wrapperClassName="scroll"
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
    </div>
  );
};

export default Calendar;
