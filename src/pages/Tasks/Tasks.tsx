import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../api/firebase";
import ScrollableCalendar from "../../components/Calendar/Calendar";
import ResponsiveAppBar from "../../components/ResponsiveAppBar/ResponsiveAppBar";
import { TasksProvider } from "../../components/TasksContext/TasksContext";
import TaskWrapper from "../../components/TaskList/TaskList";
import StyledPuffLoader from "../../helpers/StyledPuffLoader/StyledPuffLoader";

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
            <TaskWrapper user={user} />
          </TasksProvider>
        </>
      )}
    </>
  );
};

export default Tasks;
