import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';

/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const handleRegister= ()=>{
        fetch("http://localhost:3000/users/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ username:email, password })
        }).then(response => response.json())
    .then(data => {
        // Handle the response data here
        console.log(data);
    })
    .catch(error => {
        // Handle errors here
        console.error("Error:", error);
    });
    }
    return <div>
        <Card variant="outlined" sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
        <div>
            <center>
            <h1>Signup</h1>
            </center>
            <br/>
           <center>
            <TextField 
                //id="outlined-basic" 
                label="Email" 
                variant="outlined" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
            />
            </center>
            <br/>
            <center>
            <TextField 
                //id="outlined-basic" 
                label="Password" 
                variant="outlined" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
            />
            </center>
            <br/>
            <center>
            <Button variant="outlined" onClick={handleRegister}>Signup</Button>
            </center>
            <br/>
            Already registered? Login here: <a href="/login">Login</a>
        </div>
        </Card>
    </div>
}

export default Register;