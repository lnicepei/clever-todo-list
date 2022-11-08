import { User } from "firebase/auth";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { nanoid } from "nanoid";
import { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, fetchUserData } from "../firebase/firebase";
import ScrollableCalendar from "./Calendar/ScrollableCalendar/ScrollableCalendar";
import ResponsiveAppBar from "./ResponsiveAppBar/ResponsiveAppBar";
import StyledPuffLoader from "./TasksView/StyledPuffLoader/StyledPuffLoader";
import TaskView from "./TasksView/TaskWrapper/TaskWrapper";

interface TasksContext {
  name: string;
  user: User | null | undefined;
  userFromDB: QueryDocumentSnapshot<DocumentData> | undefined;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  taskContent: Task;
  setTaskContent: React.Dispatch<React.SetStateAction<Task>>;
  allTasks: Task[];
  setAllTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  dayToShowTasks: string;
  setDayToShowTasks: React.Dispatch<React.SetStateAction<string>>;
}

export const TasksContext = createContext<TasksContext | null>(null);

const Tasks = () => {
  const [user, loading] = useAuthState(auth);
  const [userFromDB, setUserFromDB] =
    useState<QueryDocumentSnapshot<DocumentData>>();
  const [name, setName] = useState("");
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [dayToShowTasks, setDayToShowTasks] = useState(
    new Date().toDateString()
  );
  const [open, setOpen] = useState(false);
  const [taskContent, setTaskContent] = useState<Task>({
    name: "",
    date: dayToShowTasks,
    complete: false,
    id: nanoid(),
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserData(user, setUserFromDB, setAllTasks, setName);
  }, [user, loading]);

  return (
    <>
      {loading ? (
        <StyledPuffLoader />
      ) : (
        <TasksContext.Provider
          value={{
            name,
            user,
            userFromDB,
            open,
            setOpen,
            taskContent,
            setTaskContent,
            allTasks,
            setAllTasks,
            dayToShowTasks,
            setDayToShowTasks,
          }}
        >
          <ResponsiveAppBar />
          <ScrollableCalendar />
          <TaskView />
        </TasksContext.Provider>
      )}
    </>
  );
};

export default Tasks;
