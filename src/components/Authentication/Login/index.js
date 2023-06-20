/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Swal from 'sweetalert2';
import CryptoJS from 'crypto-js';

//import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
//import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
//import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function SignIn() {
  document.title = 'SalesReports | Loin Page';
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  useEffect(() => {
    // const jwtToken = Cookies.get('sales-token');
    // if (jwtToken) navigate('/');
    const storedRememberMe = localStorage.getItem('rememberMe') === 'true';
    const storedUsername = localStorage.getItem('username') || '';
    const storedPassword = localStorage.getItem('password') || '';

    setUsername(storedRememberMe ? storedUsername : '');
    const bytes = CryptoJS.AES.decrypt(storedPassword, 'encryptionKey');
    const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
    setPassword(storedRememberMe ? decryptedPassword : '');
    setRememberMe(storedRememberMe);
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const baseUrl = 'http://172.19.1.15:5000';

  // const forgotPassword = async () => {
  //   const { value: email } = await Swal.fire({
  //     title: 'Input email address',
  //     input: 'email',
  //     inputLabel: 'Your email address',
  //     inputPlaceholder: 'Enter your email address',
  //   });

  //   if (email) {
  //     try {
  //       Swal.fire({
  //         title: 'Loading',
  //         allowOutsideClick: false,
  //         allowEscapeKey: false,
  //         didOpen: () => {
  //           Swal.showLoading();
  //         },
  //       });
  //       const url = `${baseUrl}/api/v1/users/forgotPassword`;

  //       const response = await axios.post(url, { email });

  //       if (response.status === 200) {
  //         Swal.close();
  //         Swal.fire({
  //           icon: 'success',
  //           text: 'Reset Password',
  //           title: `${response.data.message}`,
  //         });
  //         //navigate(`/forgotpass/${response.data.token}`);
  //       } else {
  //         Swal.close();
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'oops',
  //           text: 'Something went wrong!',
  //         });
  //       }
  //     } catch (err) {
  //       Swal.close();
  //       Swal.fire({
  //         icon: 'error',
  //         title: `${err.response.data.message} `,
  //       });
  //     }
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      Swal.fire({
        title: 'Loading',
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const userDetails = {
        email: username,
        password: password,
      };

      const url = `${baseUrl}/api/v1/users/login`;

      const response = await axios.post(url, userDetails);

      if (response.status === 200) {
        const { userDetails, token } = response.data;
        const employeeDetails = JSON.stringify(userDetails);
        localStorage.setItem('salesEmp', employeeDetails);
        Cookies.set('sales-token', token, {
          expires: 10,
        });
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('username', username);
          const encryptedPassword = CryptoJS.AES.encrypt(
            password,
            'encryptionKey'
          ).toString();
          localStorage.setItem('password', encryptedPassword);
        } else {
          localStorage.removeItem('rememberMe');
          localStorage.removeItem('username');
          localStorage.removeItem('password');
        }
        Swal.close();
        navigate('/');
      } else {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'oops',
          text: 'Something went wrong!',
        });
      }
    } catch (err) {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: `${err.response.data.message} `,
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Box sx={{ borderRadius: '50%' }}>
            <img
              alt='logo'
              src='../../../hetero.ico'
              style={{ width: 30, height: 30, margin: '3px' }}
            />
            {/* <Avatar
              sx={{
                m: 1,
                width: 20,
                height: 20,
                alignSelf: 'center',
                bgcolor: '#ffffff',
              }}
              alt='logo'
              src='../../../hetero.ico'
            /> */}
            {/* <LockOutlinedIcon />
          </Avatar> */}
          </Box>

          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box component='form' onSubmit={handleSubmit}>
            <FormControl
              fullWidth
              required
              sx={{ margin: '10px' }}
              variant='outlined'
              autoComplete='email'>
              <InputLabel htmlFor='outlined-adornment-username'>
                UserName
              </InputLabel>
              <OutlinedInput
                id='outlined-adornment-username'
                type='email'
                label='Username'
                required
                value={username}
                onChange={handleUsernameChange}
                autoComplete='email'
                autoFocus
              />
            </FormControl>

            <FormControl fullWidth sx={{ margin: '10px' }} variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-password'>
                Password
              </InputLabel>
              <OutlinedInput
                id='outlined-adornment-password'
                type={showPassword ? 'text' : 'password'}
                label='Password'
                value={password}
                required
                onChange={handlePasswordChange}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      //onMouseDown={handleMouseDownPassword}
                      edge='end'>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControlLabel
              sx={{ marginLeft: '3px' }}
              control={
                <Checkbox
                  id='rememberMe'
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
              }
              label='Remember Me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2' onClick={forgotPassword}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='/register/details' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        <Typography
          variant='body2'
          color='text.secondary'
          align='center'
          sx={{ mt: 8, mb: 4 }}>
          {'Copyright © '}
          <Link color='inherit' href='https://www.heterohealthcare.com/'>
            Hetero Health Care
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </ThemeProvider>
  );
}
