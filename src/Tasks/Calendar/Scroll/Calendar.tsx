import {
  addDays,
  addMonths, isBefore, subDays
} from "date-fns";
import { endOfMonth } from "date-fns/esm";
import React, {
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { TasksContext } from "../../Tasks";
import Day from "../Day/Day";
import useDrag from "../UseDrag";
import "./Calendar.css";

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const Calendar = () => {
  const [startDay, setStartDay] = useState(new Date());
  const [endDay, setEndDay] = useState(endOfMonth(new Date()));
  let day = subDays(startDay, 1);
  let dayToPrepend = subDays(endDay, 1);

  let tempCalendar: string[] = [];

  const { dragStart, dragStop, dragMove, dragging } = useDrag();
  const tasksContext = useContext(TasksContext);

  const dayRef = useRef<null | HTMLDivElement>(null);
  const scrollMenuRef = useRef({} as scrollVisibilityApiType);

  const [calendar, setCalendar] = useState<string[]>([]);
  const [selected, setSelected] = useState<number>(
    tempCalendar.indexOf(new Date().toDateString())
  );

  const appendMonthToCalendar = () => {
    setEndDay((prevEndDay) => addMonths(prevEndDay, 1));

    while (isBefore(day, endDay)) {
      tempCalendar.push(addDays(day, 1).toDateString());
      day = addDays(day, 1);
    }

    setCalendar(tempCalendar);
  };

  // const prependMonthToCalendar = () => {
  //   setStartDay((prevStartDay) => subMonths(prevStartDay, 1));

  //   while (isBefore(startDay, dayToPrepend)) {
  //     tempCalendar.unshift(subDays(dayToPrepend, 1).toDateString());
  //     dayToPrepend = subDays(dayToPrepend, 1);
  //   }

  //   setCalendar(tempCalendar);
  // };

  // useEffect(() => {
  //   if (
  //     scrollMenuRef.current.visibleElements.includes(
  //       scrollMenuRef.current.items.toItems()[4] || ""
  //     )
  //   )
  //     prependMonthToCalendar();
  //   scrollMenuRef.current.scrollToItem(
  //     scrollMenuRef?.current?.items.get(new Date().getDate().toString())
  //   );
  // }, [scrollMenuRef.current.isFirstItemVisible]);

  // useEffect(() => {
  //   if (scrollMenuRef.current.isFirstItemVisible) prependMonthToCalendar();
  // }, [scrollMenuRef.current.isFirstItemVisible]);

  useEffect(() => {
    if (scrollMenuRef.current.isLastItemVisible) appendMonthToCalendar();
  }, [scrollMenuRef.current.isLastItemVisible]);

  const handleDrag =
    ({ scrollContainer }: scrollVisibilityApiType) =>
    (ev: React.MouseEvent) =>
      dragMove(ev, (posDiff) => {
        if (scrollContainer.current) {
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
    // setEndDay((prevEndDay) => addMonths(prevEndDay, 1));
    // setStartDay((prevStartDay) => subMonths(prevStartDay, 1));
    appendMonthToCalendar();
    setCalendar(tempCalendar);
  }, []);

  return (
    <ScrollMenu
      onMouseDown={() => dragStart}
      onMouseUp={() => dragStop}
      onMouseMove={handleDrag}
      apiRef={scrollMenuRef}
      // onInit={() =>
      // scrollMenuRef.current.scrollToItem(
      //   scrollMenuRef?.current?.items.get(new Date().getDate().toString())
      // )
      // }
      onInit={
        () => appendMonthToCalendar()
        //   prependMonthToCalendar() ||
        //   scrollMenuRef.current.scrollToItem(
        //     scrollMenuRef?.current?.items.get(new Date().getDate().toString())
        //   )
      }
    >
      {console.log(calendar) ||
        calendar.map((dayOfMonth, key) => (
          <Day
            day={dayOfMonth}
            key={key}
            onClick={handleItemClick(key)}
            selected={key === selected}
            dayRef={dayRef}
            date={new Date(calendar?.at(key) ?? "")}
          />
        ))}
    </ScrollMenu>
  );
};

export default Calendar;
