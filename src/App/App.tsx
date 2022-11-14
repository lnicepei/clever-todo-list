import { Container, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Auth from "../components/AuthWrapper/AuthWrapper";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import HomePage from "../pages/HomePage/HomePage";
import NotFound from "../pages/NotFound/NotFound";
import Tasks from "../pages/Tasks/Tasks";
import { darkTheme } from "../themes/Themes";
import "./App.css";

function App() {
  return (
    <Container sx={{ padding: 0 }}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
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
      </ThemeProvider>
    </Container>
  );
}

export default App;
