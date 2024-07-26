import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleLogin = () => {
    fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data here
        console.log(data);
        localStorage.setItem("token", data.token);

        setSeverity("success");
        setMessage(data.message);
        setOpen(true);
        setTimeout(() => {
          navigate("/courses");
        }, 2000);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
        setMessage("An error occurred during registration.");
        setSeverity("error");
        setOpen(true);
      });
  };

  return (
    <div>
      <Card
        variant="outlined"
        sx={{ maxWidth: 400, margin: "auto", padding: 2 }}
      >
        <div>
          <h1>Login to dashboard</h1>
          <br />
          <center>
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </center>
          <br />
          <center>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </center>
          <br />
          <center>
            <Button variant="outlined" onClick={handleLogin}>
              Login
            </Button>
          </center>
          <br />
          New here? <a href="/register">Register</a>
        </div>
      </Card>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Login;
