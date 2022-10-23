import { Container } from "@mui/material";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Authorization/Login";
import Register from "./Authorization/Register";
import HomePage from "./HomePage/HomePage";
import NotFound from "./NotFound";
import TaskView from "./TasksView/TaskView";

function App() {
  return (
    <Container className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasks" element={<TaskView />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
