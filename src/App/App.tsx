import { Container, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
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
import { darkTheme, lightTheme } from "../themes/Themes";
import "./App.css";

function App() {
  return (
    <Container sx={{ padding: 0 }}>
      <ThemeProvider
        theme={
          window.matchMedia("(prefers-color-scheme: dark)").matches
            ? darkTheme
            : lightTheme
        }
      >
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
