import { isSameDay } from "date-fns";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import Calendar from "./Calendar/Calendar";
import NewTask from "./NewTask/NewTask";
import ResponsiveAppBar from "./ResponsiveAppBar";
import TaskView from "./TasksView/TaskView";

const Tasks = () => {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const [allTasks, setAllTasks] = useState([]);
  const [tasksFromDay, setTasksFromDay] = useState([]);
  const [dayToShowTasks, setDayToShowTasks] = useState(new Date());
  const navigate = useNavigate();

  const fetchUserName = async () => {
    const q = query(collection(db, "users"), where("uid", "==", user?.uid));
    const doc = await getDocs(q);
    const data = doc.docs[0].data();
    setAllTasks(data.tasks);
    setName(data.name || (user?.displayName ?? user?.email));
  };

  useEffect(() => {
    setTasksFromDay(
      allTasks.filter((task) =>
        isSameDay(new Date(task.date), new Date(dayToShowTasks))
      )
    );
  }, [dayToShowTasks, allTasks]);

  useEffect(() => {
    if (!user) return navigate("/login");
    fetchUserName();
  }, [user, loading]);

  return (
    <>
      <ResponsiveAppBar name={name} url={user?.photoURL} />
      <Calendar setDayToShowTasks={setDayToShowTasks} />
      <NewTask setAllTasks={setAllTasks} />
      <TaskView tasks={tasksFromDay} />
    </>
  );
};

export default Tasks;
