import { Card } from "@mui/material";
import { MutableRefObject } from "react";

interface DayProps {
  day: string;
  onClick: () => false | undefined;
  selected: boolean;
  todayRef: MutableRefObject<HTMLDivElement | null> | null;
}

const Day = ({ day, onClick, selected, todayRef }: DayProps) => {
  return (
    <Card
      variant="outlined"
      onClick={() => onClick()}
      sx={{
        width: "15vh",
        height: "10vh",
        cursor: "pointer",
        userSelect: "none",
        backgroundColor: (selected && "red") || "",
      }}
      ref={todayRef}
    >
      {day}
    </Card>
  );
};

export default Day;
