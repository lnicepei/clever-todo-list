import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import NewTask from "../NewTask/NewTask";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Task from "./Task";

const TaskView = () => {
  const [user, loading, error] = useAuthState(auth);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setTasks(data.tasks);
      console.log(user?.photoURL);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (!user) return navigate("/login");
    if (loading) return;
    fetchUserName();
  }, [user, loading]);

  return (
    <>
      <ResponsiveAppBar />
      <NewTask />
      {tasks?.map((task) => (
        <Task content={task} />
      ))}
    </>
  );
};

export default TaskView;
