import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';

function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleLogin = () => {
        fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username:email, password })
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response data here
            console.log(data);
            localStorage.setItem("token", data.token);
        })
        .catch(error => {
            // Handle errors here
            console.error("Error:", error);
        });
    };

    return (
        <Card variant="outlined" sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
            <div>
                <h1>Login to dashboard</h1>
                <br/>
                <center>
                    <TextField 
                        label="Email" 
                        variant="outlined" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </center>
                <br/>
                <center>
                    <TextField 
                        label="Password" 
                        variant="outlined" 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </center>
                <br/>
                <center>
                    <Button variant="outlined" onClick={handleLogin}>Login</Button>
                </center>
                <br/>
                New here? <a href="/register">Register</a>
            </div>
        </Card>
    );
}

export default Login;
