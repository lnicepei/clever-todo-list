import { isPast, isSameDay, isToday } from "date-fns";
import { User } from "firebase/auth";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import ScrollableCalendar from "./Calendar/ScrollableCalendar/ScrollableCalendar";
import NewTask from "./NewTask/NewTaskWrapper/NewTask";
import ResponsiveAppBar from "./ResponsiveAppBar/ResponsiveAppBar";
import TaskView from "./TasksView/TaskWrapper/TaskView";

interface TasksContext {
  name: string;
  user: User | null | undefined;
  userFromDB: QueryDocumentSnapshot<DocumentData> | undefined;
  tasksFromDay: Task[];
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
  const [tasksFromDay, setTasksFromDay] = useState<Task[]>([]);
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

  const fetchUserData = async () => {
    const q = query(collection(db, "users"), where("uid", "==", user?.uid));
    const doc = await getDocs(q);
    const data = doc.docs[0].data();
    setUserFromDB(doc.docs[0]);
    setAllTasks(data.tasks);
    setName(data.name || (user?.displayName ?? user?.email));
  };

  useEffect(() => {
    setTasksFromDay(
      allTasks.filter((task: Task) =>
        isSameDay(new Date(task.date), new Date(dayToShowTasks))
      )
    );
  }, [dayToShowTasks, allTasks]);

  useEffect(() => {
    if (!user) return navigate("/");
    fetchUserData();
  }, [user, loading]);

  return (
    <TasksContext.Provider
      value={{
        name,
        user,
        userFromDB,
        tasksFromDay,
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
      {(!isPast(new Date(dayToShowTasks)) ||
        isToday(new Date(dayToShowTasks))) && <NewTask />}
    </TasksContext.Provider>
  );
};

export default Tasks;
