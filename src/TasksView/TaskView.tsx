import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import NewTask from "../NewTask/NewTask";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Task from "./Task";

const TaskView = () => {
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
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occurred while fetching user data");
    }
  };

  useEffect(() => {
    if (!user) return navigate("/login");
    fetchUserName();
  }, [user, loading]);

  return (
    <>
      <ResponsiveAppBar
        name={name ?? user?.displayName ?? user?.email}
        url={user?.photoURL}
      />
      <NewTask />
      {tasks?.map((task) => (
        <Task content={task} />
      ))}
    </>
  );
};

export default TaskView;
