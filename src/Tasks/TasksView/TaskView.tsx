import Task from "./Task";
import Skeleton from "@mui/material/Skeleton";

const TaskView = ({ tasks }) => {
  return (
    <>
      {tasks?.length ? (
        tasks?.map((task, index) => <Task content={task} key={index} />)
      ) : (
        <Skeleton
          sx={{ height: "75ch" }}
          variant="rectangular"
          animation="wave"
        />
      )}
    </>
  );
};

export default TaskView;
