import { SnackbarCloseReason } from "@mui/material";
import React, { createContext, useState } from "react";
import BasicSnackbar from "../../Snackbar/BasicSnackbar";

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

export interface ChildrenProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextValue>({
  password: "",
  setPassword: () => {},
  name: "",
  setName: () => {},
  email: "",
  setEmail: () => {},
  errorMessage: "",
  setErrorMessage: () => {},
  handleErrorMessage: () => {},
});

export const AuthContextProvider = ({ children }: ChildrenProps) => {
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
    event: Event | React.SyntheticEvent<any, Event>,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

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
      {children}
      <BasicSnackbar open={open} onClose={handleClose} message={errorMessage} />
    </AuthContext.Provider>
  );
};
