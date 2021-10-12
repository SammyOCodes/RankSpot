import './signup.css';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Container, Box } from '@material-ui/core';
import Button from '@mui/material/Button';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';

export default function CreateProfile() {

  const [profile, setProfile] = useState({
      email: '',
      password: '',
  });

  let history = useHistory();
  const goToLogin = () => { history.push('/login'); }

  //send data to back end with axios
  const CreateProfile = () => {
        axios.post('http://localhost:5000/profiles', profile).then( () => {
        window.location.reload(false); 
      })
      goToLogin();
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
    <div className="signUp">
        <Container align="center" maxWidth="lg">
            <Box component="span"
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
            }}>
            <ThemeProvider theme={theme}>
              <h2>Create New Account</h2>
              <TextField id="outlined-basic" label="Email" variant="outlined" value={profile.email} onChange={(event) => {
                  setProfile({ ...profile, email: event.target.value})
              }} />
              <TextField id="outlined-basic" label="Password" variant="outlined" type="password"
              value={profile.password} onChange={(event) => {
              setProfile({ ...profile, password: event.target.value})
              }} />
              <Button color="primary" variant="contained" onClick={CreateProfile}>
                  Sign Up
              </Button>
              <Button color="primary" variant="text" onClick={goToLogin}>
              Back to Login
              </Button>
            </ThemeProvider>
          </Box>
        </Container>
    </div>
);
}