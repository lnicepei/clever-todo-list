import { Card } from "@mui/material";
import { format, isPast, isToday } from "date-fns";
import { MutableRefObject } from "react";

interface DayProps {
  day: string;
  onClick: () => false | undefined;
  selected: boolean;
  dayRef: MutableRefObject<HTMLDivElement | null>;
  date: Date;
}

const Day = ({ day, onClick, selected, dayRef, date }: DayProps) => {
  return (
    <Card
      variant="outlined"
      onClick={() => onClick()}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "7vh",
        height: "8vh",
        margin: "5px",
        borderRadius: "10px",
        cursor: "pointer",
        userSelect: "none",
        backgroundColor:
          (isToday(date) && "#1976d2") || (isPast(date) && "#eaebed") || "",
        outline: (selected && "2px solid red") || "",
        color: (!isToday(date) && isPast(date) && "#524e4f") || "",
      }}
      ref={dayRef}
    >
      <div>{format(new Date(day), "E")}</div>
      <div>{format(new Date(day), "d")}</div>
    </Card>
  );
};

export default Day;
