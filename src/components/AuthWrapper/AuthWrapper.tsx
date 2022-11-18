import { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { matchPath, useLocation, useNavigate } from "react-router-dom";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Container,
  SnackbarCloseReason,
  Typography,
} from "@mui/material";

import { auth } from "../../api/firebase";
import BasicSnackbar from "../../helpers/BasicSnackbar/BasicSnackbar";
import "./AuthWrapper.css";

interface AuthContextValue {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  handleErrorMessage: (message: string) => void;
}

export type ChildrenProps = { children: React.ReactNode };

export const AuthContext = createContext<AuthContextValue>(
  {} as AuthContextValue
);

const AuthWrapper: React.FC<ChildrenProps> = ({ children }) => {
  const [user] = useAuthState(auth);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const handleErrorMessage = (error: string) => {
    setErrorMessage(error);
    setOpen(true);
  };

  const handleClose = (
    _event: Event | React.SyntheticEvent<Element, Event>,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/tasks");
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        name,
        setName,
        password,
        setPassword,
        email,
        setEmail,
        errorMessage,
        setErrorMessage,
        handleErrorMessage,
      }}
    >
      <Container component="main" maxWidth="xs">
        <Box className="auth">
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            {matchPath(useLocation().pathname, "/login") ? "Log In" : "Sign Up"}
          </Typography>
        </Box>
        {children}
      </Container>
      <BasicSnackbar open={open} onClose={handleClose} message={errorMessage} />
    </AuthContext.Provider>
  );
};

export default AuthWrapper;
