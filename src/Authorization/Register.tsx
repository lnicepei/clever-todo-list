import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  const register = () => {
    registerWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/tasks");
  }, [user, loading]);

  return (
    <div>
      <div>
        <TextField
          variant="outlined"
          label="Email"
          type="email"
          required={true}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          type="password"
          label="Password"
          required={true}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={register}>Register</Button>
        <Button onClick={signInWithGoogle}>Continue with Google</Button>
        <div>
          Already have an account? <Link to="/login">Login</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Register;
