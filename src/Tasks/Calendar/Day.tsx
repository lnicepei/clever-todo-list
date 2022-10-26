import { Card } from "@mui/material";

const Day = ({ day, onClick, selected, todayRef }) => {
  return (
    <Card
      variant="outlined"
      onClick={() => onClick()}
      sx={{
        width: "15vh",
        height: "10vh",
        cursor: "pointer",
        userSelect: "none",
        backgroundColor: selected && "red",
      }}
      ref={todayRef}
    >
      {day}
    </Card>
  );
};

export default Day;
