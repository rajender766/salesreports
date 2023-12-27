import React from 'react';

import { styled } from '@mui/material/styles';
import { Avatar, Badge, Stack } from '@mui/material';
import profileImage from '../images/blank-profile-picture-g76cb0bab4_1280.png';
import Header from './Header';

const Profile = () => {
  document.title = 'Priamry Sales | Profile Details';
  const profileDetails = JSON.parse(
    localStorage.getItem(`${process.env.REACT_APP_USER_KEY}`)
  );

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

  return (
    <div className='row justify-content-center'>
      <Header />
      <div className='w-75 h-100 p-3 d-flex flex-column'>
        <div className='align-self-center p-3 graph-main-container align-items-center w-100'>
          <Stack direction='row' spacing={2}>
            <StyledBadge
              overlap='circular'
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant='dot'>
              <Avatar
                alt={profileDetails.empName}
                sx={{ width: 100, height: 100 }}
                src={profileImage}
              />
            </StyledBadge>
          </Stack>
          <div className='mt-3 profile-container'>
            <div className='profile-details-container'>
              <h5>Id : </h5>
              <p>{profileDetails.employeeId}</p>
            </div>
            <div className='profile-details-container'>
              <h5>Name : </h5>
              <p className='text-uppercase'>{profileDetails.empName}</p>
            </div>
            <div className='profile-details-container'>
              <h5>Division : </h5>
              <p className='text-uppercase'>{profileDetails.divisionName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
