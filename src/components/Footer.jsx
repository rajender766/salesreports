import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='m-2'>
      {' '}
      <Typography
        variant='body2'
        color='text.secondary'
        align='center'
        sx={{ m: 2 }}>
        {'Copyright © '}
        <Link color='inherit' href='https://www.heterohealthcare.com/'>
          Hetero Health Care
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </div>
  );
};

export default Footer;
