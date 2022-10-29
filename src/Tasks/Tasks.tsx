import { isSameDay } from "date-fns";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import Calendar from "./Calendar/Scroll/Calendar";
import NewTask from "./NewTask/NewTaskWrapper/NewTask";
import ResponsiveAppBar from "./ResponsiveAppBar";
import TaskView from "./TasksView/TaskWrapper/TaskView";

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
    <>
      <ResponsiveAppBar name={name} url={user?.photoURL || undefined} />
      <Calendar setDayToShowTasks={setDayToShowTasks} />
      <NewTask setAllTasks={setAllTasks} userFromDB={userFromDB} />
      <TaskView
        tasksFromDay={tasksFromDay}
        userFromDB={userFromDB}
        setAllTasks={setAllTasks}
        allTasks={allTasks}
      />
    </>
  );
};

export default Tasks;
