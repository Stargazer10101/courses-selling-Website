import React from "react";
import { Navigate, useNavigate } from 'react-router-dom';
//import Button from '@mui/material/Button';
//import TextField from '@mui/material/TextField';
//import Card from '@mui/material/Card';
//import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useState } from "react";
import { TextField, Button, Card, CardContent, Typography, Box, Snackbar, Link } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("success");
    const navigate = useNavigate();

    const handleRegister = () => {
        fetch("http://localhost:3000/users/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: email, password })
        })
          .then(response => response.json())
          .then(data => {
            // Handle the response data here
            console.log(data);
            
              setSeverity("success");
              setMessage(data.message);
              setOpen(true);
              setTimeout(() => {
                navigate("/login");
              }, 2000);
        
          })
          .catch(error => {
            // Handle errors here
            console.error("Error:", error);
            setMessage("An error occurred during registration.");
            setSeverity("error");
            setOpen(true);
          });
      };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

      return (
        <div>
            <Card variant="outlined" sx={{ maxWidth: 400, margin: 'auto', padding: 2, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h4" component="h1" align="center" gutterBottom>
                        Signup
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
                        <Button variant="contained" color="primary" onClick={handleRegister}>
                            Signup
                        </Button>
                    </Box>
                    <Typography variant="body2" color="textSecondary" align="center" paragraph>
                        Already registered? <Link href="/login" underline="none">Login here</Link>
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

export default Register;