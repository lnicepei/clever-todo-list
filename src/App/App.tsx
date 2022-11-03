import { Container } from "@mui/material";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Auth from "../Authorization/AuthWrapper/AuthWrapper";
import Login from "../Authorization/Login/Login";
import Register from "../Authorization/Register/Register";
import HomePage from "../HomePage/HomePage";
import NotFound from "../NotFound/NotFound";
import Tasks from "../Tasks/Tasks";
import "./App.css";

function App() {
  return (
    <Container sx={{ padding: 0 }}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="login"
            element={
              <Auth>
                <Login />
              </Auth>
            }
          ></Route>
          <Route
            path="register"
            element={
              <Auth>
                <Register />
              </Auth>
            }
          ></Route>
          <Route path="tasks" element={<Tasks />} />
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
