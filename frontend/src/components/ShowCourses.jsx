import React from "react";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { boughtCoursesState } from '../atoms/atoms';
import { useRecoilState } from 'recoil';


function ShowCourses() {
    const [boughtCourses, setBoughtCourses] = useRecoilState(boughtCoursesState);
    const navigate= useNavigate();

    const handleClick = () => {
        navigate('/buycourses');
    };

    // Add code to fetch courses from the server
    // and set it in the courses state variable.
    return <div>
        <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding={2}
      border={1}
      borderColor="grey.500"
      borderRadius={2}
    >
      
    




        <Typography variant="h4" component="h1" gutterBottom>
        Your Courses:
        </Typography>
        {boughtCourses.map(c => <Course title={c.title} />)}


        <Button variant="contained" color="primary" onClick={handleClick}>
         Buy Courses
        </Button>


        </Box>


    </div>
}

// Note: written below is a functional component.
function Course(props) {
    return <div>
        <h1>{props.title}</h1>
    </div>
}



export default ShowCourses;

