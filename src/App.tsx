import { Container } from "@mui/material";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Auth from "./Authorization/Auth";
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
          <Route
            path="login"
            element={<Auth content={<Login />} operation="Log In" />}
          />
          <Route
            path="register"
            element={<Auth content={<Register />} operation="Sign Up" />}
          />
          <Route path="tasks" element={<TaskView />} />
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
