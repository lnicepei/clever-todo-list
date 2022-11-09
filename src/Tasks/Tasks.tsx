import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import ScrollableCalendar from "./Calendar/ScrollableCalendar/ScrollableCalendar";
import ResponsiveAppBar from "./ResponsiveAppBar/ResponsiveAppBar";
import { TasksProvider } from "./TasksContext";
import StyledPuffLoader from "./TasksView/StyledPuffLoader/StyledPuffLoader";
import TaskView from "./TasksView/TaskWrapper/TaskWrapper";

const Tasks = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);

  return (
    <>
      {loading ? (
        <StyledPuffLoader />
      ) : (
        <>
          <ResponsiveAppBar
            username={user?.displayName || user?.email || ""}
            photoUrl={user?.photoURL || undefined}
          />
          <TasksProvider>
            <ScrollableCalendar />
            <TaskView user={user} />
          </TasksProvider>
        </>
      )}
    </>
  );
};

export default Tasks;
