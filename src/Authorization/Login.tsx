import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [user, loading] = useAuthState(auth);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/tasks");
  }, [user, loading]);

  return (
    <div>
        <TextField
          variant="outlined"
          label="Email"
          type="text"
          required={true}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="Password"
          type="password"
          required={true}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={() => logInWithEmailAndPassword(email, password)}>
          Login
        </Button>
        <Button onClick={signInWithGoogle}>Continue with Google</Button>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
    </div>
  );
};

export default Login;
