import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "../../api/firebase";
import Calendar from "../../components/Calendar/Calendar";
import TaskWrapper from "../../components/TaskList/TaskList";
import { TasksProvider } from "../../components/TasksContext/TasksContext";
import StyledPuffLoader from "../../helpers/StyledPuffLoader/StyledPuffLoader";
import ResponsiveAppBar from "../../components/ResponsiveAppBar/ResponsiveAppBar";

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
            <Calendar />
            <TaskWrapper user={user} />
          </TasksProvider>
        </>
      )}
    </>
  );
};

export default Tasks;
