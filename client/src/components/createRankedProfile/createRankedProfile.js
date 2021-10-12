import React, { useState } from 'react';
import { Container, Box } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';

export default function CreateRankedProfile() {

  const [rankedProfile, setRankedProfile] = useState({
      username: '',
      password: '',
  });

  let history = useHistory();

  //send data to back end with axios
  const CreateRankedProfile = () => {
      //front end is running on port 3000, while back end is running on port 5000
      axios.post('http://localhost:5000/rankedProfiles', rankedProfile).then( () => {
        //auto-refresh the page after pressing button
        window.location.reload(false);
      })
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: '#4843D9',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#4843D9',
        contrastText: '#FFFFFF',
      },
    },
  });
  
  return (
    <>
        <Box>
          <Container align="center" maxWidth="lg">
          <Box
            component="span"
            sx={{
              bgcolor: '#FFFFFF',
              opacity: 0.9,
              width: 600,
              height: 400,
              color: '#4843D9',

              borderColor: '#FFFFFF',
              border: 20,
              borderRadius: '44px',

              display: 'grid',
              alignItems: 'center',
              justifyContent: 'center',
              pt: 7.5,
              pb: 7.5,
            }}
          >
            <h2>Create New Account</h2>
            <TextField id="outlined-basic" label="Username" variant="outlined" value={rankedProfile.username} onChange={(event) => {
                setRankedProfile({ ...rankedProfile, username: event.target.value})
            }} />
            <TextField id="outlined-basic" label="Password" variant="outlined" value={rankedProfile.password} onChange={(event) => {
                setRankedProfile({ ...rankedProfile, password: event.target.value})
            }} />
            <ThemeProvider theme={theme}>
              <Button color="primary" variant="contained" onClick={CreateRankedProfile}>
                  Sign Up
              </Button>
              <Button color="primary" variant="text" onClick={() =>  {
                history.push('/login');
              }}
            >
              Back to Login
            </Button>
            </ThemeProvider>
            
          </Box>
          </Container>
        </Box>
    </>
);
}