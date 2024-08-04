import React from "react";
//import Button from "@mui/material/Button";
//import TextField from "@mui/material/TextField";
//import Card from "@mui/material/Card";
//import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { TextField, Button, Card, CardContent, Typography, Box, Snackbar, Alert, Link } from '@mui/material';

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
        }, 1000);
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
        <Card variant="outlined" sx={{ maxWidth: 400, margin: 'auto', padding: 2, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Login to Dashboard
                </Typography>
                <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={handleLogin}>
                        Login
                    </Button>
                </Box>
                <Typography variant="body2" color="textSecondary" align="center" paragraph>
                    New here? <Link href="/register" underline="none">Register</Link>
                </Typography>
            </CardContent>
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
