import './login.css';
import React, { useState, useEffect } from 'react';
import { Container, Box } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';


export default function Login() {

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

  //use states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();
  
  //use effect
  useEffect(() => {
    const loggedInUser = localStorage.getItem('userInfo');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  //reroutes
  const history = useHistory();
  const goToSignUp = () => { history.push('/signup'); }
  const goToHomepage = () => { history.push('/home'); }

  //onClick functions
  const submitHandler = async (e) => {
    e.preventDefault();
    
    try{
      const data = await axios.post('http://localhost:5000/profiles/login', {
        email,
        password,
      });
      window.localStorage.setItem('userInfo', JSON.stringify(data));
      goToHomepage();
    } catch (error) {
      console.log(error);
    }
  };

  const logoutHandler = () => {

    setUser({});
    setEmail("");
    setPassword("");

    localStorage.clear();
    window.location.reload();
  };

  //if a user is already logged in =>
  if(user) {
    return (
    <div className="loggedIn">
      <ThemeProvider theme={theme}>
        <Container align="center" maxWidth="lg">
          <div className="loggedInButtons">
            <p>{user.data.email} is already logged in</p>
            <Box
            component="span"
            sx={{ bgcolor: '#FFFFFF', height: 100, display: 'grid', alignItems: 'center', justifyContent: 'center' }}>
            <Button color="primary" variant="contained" onClick={logoutHandler}>
                  Logout
              </Button>
              <Button color="primary" variant="contained" onClick={goToHomepage}>
                Back to Home
              </Button>
            </Box>
          </div>
        </Container>
      </ThemeProvider>
    </div>
    );
  }
  
  return (
    <div className="login">
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
          <h2>Welcome to RankSpot!</h2>
          <TextField id="outlined-basic" label="Email" variant="outlined" 
            value={email} onChange={(e) => setEmail(e.target.value)}/>
          <TextField id="outlined-basic" label="Password" variant="outlined" type="password"
            value={password} onChange={(e) => setPassword(e.target.value)} />
          <ThemeProvider theme={theme}>
            <Button color="primary" variant="contained" onClick={submitHandler}>
                Login
            </Button>
            <Button color="primary" variant="text" onClick={goToSignUp}>
              New User? Sign Up Here
            </Button>
          </ThemeProvider>
        </Box>
      </Container>
    </div>
);
}