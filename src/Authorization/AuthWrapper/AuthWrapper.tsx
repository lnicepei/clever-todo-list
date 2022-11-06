import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { AuthContextProvider, ChildrenProps } from "../AuthContext/AuthContext";

const Auth: React.FC<ChildrenProps> = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/tasks");
  }, [user]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          {matchPath(useLocation().pathname, "/login") ? "Log In" : "Sign Up"}
        </Typography>
      </Box>
      <AuthContextProvider>{children}</AuthContextProvider>
    </Container>
  );
};

export default Auth;
