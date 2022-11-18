import { isPast, isToday } from "date-fns";

import {
  Card,
  CardContent,
  CardContentProps,
  CardProps,
  Palette,
  styled,
} from "@mui/material";

interface IProps extends CardProps {
  selected: boolean;
  date: Date;
}

export const CalendarDayCard = styled(Card)<IProps>(
  ({ theme, selected, date }) => ({
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "18px",
    margin: "0 5px",
    overflow: "visible",
    userSelect: "none",
    boxSizing: "border-box",
    color: selectColor(theme.palette, selected, date),
    outline: selected ? "2px solid red" : "none",
    backgroundColor: selectBgColor(theme.palette, date),

    "& .markers": {
      position: "absolute",
      bottom: "-17px",
      left: "-8px",
      display: "flex",
    },
    ".markers.both li:nth-of-type(odd)": {
      color: "#ff6739",
    },
    ".markers.both li:nth-of-type(even)": {
      color: "#ffcf57",
    },
    ".markers.undone li": {
      color: "#ff6739",
    },
    ".markers.done li": {
      color: "#ffcf57",
    },
  })
);

export const CalendarDayCardContent = styled(CardContent)<CardContentProps>({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  cursor: "pointer",
  height: "65px",
  width: "55px",
});

const selectColor = (palette: Palette, selected: boolean, date: Date) => {
  if (selected) {
    return palette.warning.dark;
  }

  if (isToday(date)) {
    return palette.background.default;
  }

  if (!isToday(date) && isPast(date)) {
    return palette.text.disabled;
  }

  return palette.text.primary;
};

const selectBgColor = (palette: Palette, date: Date) => {
  if (isToday(date)) {
    return palette.text.primary;
  }

  if (isPast(date)) {
    return palette.secondary.light;
  }

  return palette.secondary.dark;
};
