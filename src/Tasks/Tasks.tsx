import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, fetchUserData } from "../firebase/firebase";
import ScrollableCalendar from "./Calendar/ScrollableCalendar/ScrollableCalendar";
import ResponsiveAppBar from "./ResponsiveAppBar/ResponsiveAppBar";
import { useTasksDispatch } from "./TasksContext";
import StyledPuffLoader from "./TasksView/StyledPuffLoader/StyledPuffLoader";
import TaskView from "./TasksView/TaskWrapper/TaskWrapper";

const Tasks = () => {
  const [user, loading] = useAuthState(auth);
  const dispatch = useTasksDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserData(user, dispatch);
  }, [user, loading]);

  return (
    <>
      {loading ? (
        <StyledPuffLoader />
      ) : (
        <>
          <ResponsiveAppBar />
          <ScrollableCalendar />
          <TaskView />
        </>
      )}
    </>
  );
};

export default Tasks;
