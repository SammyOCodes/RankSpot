import './addApexProfile.css';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Container, Box } from '@material-ui/core';
import Button from '@mui/material/Button';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';

export default function AddApexProfile() {
  const email = JSON.parse(localStorage.getItem('userInfo')).data.email;

  const [apexUsername, setApexUsername] = useState("");
  const [apexPlatform, setApexPlatform] = useState("");

  let history = useHistory();
  const goToAddAccounts = () => { history.push('/addAccounts'); }

  const submitHandler = async (e) => {
    e.preventDefault();
    try{
        await axios.put('http://localhost:5000/profiles/updateApexAccount', {
            email,
            apexUsername,
            apexPlatform,
        });
        history.push('/addAccounts');
    } catch (error) {
        console.log("Error");
    }
  };

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
    <div className="addApexProfile">
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
        <h2>Add Apex Account</h2>
            <TextField id="outlined-basic" label="IGN" variant="outlined" 
                value={apexUsername} onChange={(e) => setApexUsername(e.target.value)} />
            <TextField id="outlined-basic" label="Platform (PC, XBOX, PLAYSTATION)" variant="outlined" 
                value={apexPlatform} onChange={(e) => setApexPlatform(e.target.value)} />
            <ThemeProvider theme={theme}>
              <Button color="primary" variant="contained" onClick={submitHandler}>
                  Add Account!
              </Button>
              <Button color="primary" variant="text" onClick={goToAddAccounts}>
                Add Account for Another Game
            </Button>
            </ThemeProvider>
          </Box>
        </Container>
    </div>
);
}