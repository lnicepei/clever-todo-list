import { Container } from "@mui/material";
import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Login from "./Authorization/Login";
import Register from "./Authorization/Register";
import NewTask from "./NewTask/NewTask";
import TaskView from "./TasksView/TaskView";

function App() {
  return (
    <Container className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/newTask" element={<NewTask />} />
          <Route path="/tasks" element={<TaskView />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
