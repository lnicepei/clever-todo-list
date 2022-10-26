import { query, collection, where, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import NewTask from "./NewTask/NewTask";
import ResponsiveAppBar from "./ResponsiveAppBar";
import TaskView from "./TasksView/TaskView";

const Tasks = () => {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setTasks(data.tasks);
      setName(data.name || (user?.displayName ?? user?.email));
    } catch (err) {
      setTasks([]);
    }
  };

  useEffect(() => {
    if (!user) return navigate("/login");
    fetchUserName();
  }, [user, loading]);

  return (
    <>
      <ResponsiveAppBar name={name} url={user?.photoURL} />
      <NewTask setTasks={setTasks} />
      <TaskView tasks={tasks} />
    </>
  );
};

export default Tasks;
