import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import AuthWrapper from "../components/AuthWrapper/AuthWrapper";
import HomePage from "../pages/HomePage/HomePage";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import Register from "../pages/Register/Register";
import Tasks from "../pages/Tasks/Tasks";
import { darkTheme } from "../themes/Themes";
import "./App.css";
import { AppContainer } from "./style";

const App = () => {
  return (
    <AppContainer>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="login"
              element={
                <AuthWrapper>
                  <Login />
                </AuthWrapper>
              }
            />
            <Route
              path="register"
              element={
                <AuthWrapper>
                  <Register />
                </AuthWrapper>
              }
            />
            <Route path="tasks" element={<Tasks />} />
            <Route path="404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AppContainer>
  );
};

export default App;
