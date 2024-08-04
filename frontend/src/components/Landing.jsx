import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function Landing() {
    return (
        <div>
            <Box display="flex" justifyContent="flex-end" padding={2}>
                <Link href="/admin-login" underline="none" variant="body1" color="primary">
                    Admin Login
                </Link>
            </Box>
            <Box display="flex" justifyContent="center" padding={2}>
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    User Login
                </Typography>
            </Box>
            <Card variant="outlined" sx={{ maxWidth: 800, margin: 'auto', padding: 2, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h4" component="h1" align="center" gutterBottom>
                        Welcome to the Online Courses Website
                    </Typography>
                    <Typography variant="body1" color="textSecondary" align="center" paragraph>
                        Join us today to explore a wide range of courses that suit your needs. 
                        Sign up now to get started!
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    <Button href="/register" variant="contained" color="primary" sx={{ marginBottom: 1 }}>
                        Sign Up
                    </Button>
                    <Button href="/login" variant="outlined" color="primary">
                        Login
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default Landing;
