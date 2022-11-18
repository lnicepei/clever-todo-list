import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "../../api/firebase";
import Calendar from "../../components/Calendar/Calendar";
import ResponsiveAppBar from "../../components/ResponsiveAppBar/ResponsiveAppBar";
import TaskWrapper from "../../components/TaskList/TaskList";
import { TasksProvider } from "../../components/TasksContext/TasksContext";
import CustomPuffLoader from "../../helpers/PuffLoader/PuffLoader";

const Tasks = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const userName = user?.displayName || user?.email || "";
  const photoUrl = user?.photoURL || undefined;

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);

  return (
    <>
      {loading ? (
        <CustomPuffLoader />
      ) : (
        <>
          <ResponsiveAppBar username={userName} photoUrl={photoUrl} />
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
