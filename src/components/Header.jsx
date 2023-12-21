/* eslint-disable jsx-a11y/anchor-is-valid */
import Cookies from 'js-cookie';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import profileImage from '../images/blank-profile-picture-g76cb0bab4_1280.png';
import { useMediaQuery } from '@mui/material';

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isMobile = useMediaQuery('(max-width: 600px)');
  const onClickLogout = () => {
    Cookies.remove('sales-token');
    navigate('/login');
  };
  const profileDetails = JSON.parse(localStorage.getItem('userDetails'));
  return (
    <div className='nav_container'>
      <div className='nav-header ms-1 ms-md-2 '>
        <Link className='brand-logo' to='/'>
          <img src='../../logo.svg' alt='hetero' className='navbar-logo' />
        </Link>
      </div>
      <div className='header  ms-auto'>
        <div className='header-content'>
          <nav className='navbar navbar-expand'>
            <div className='collapse navbar-collapse justify-content-between'>
              <div className='nav-item d-flex align-items-center'></div>
              <ul
                className='navbar-nav header-right collapse navbar-collapse d-flex justify-content-between'
                id='navbarNavDropdown'>
                <li>
                  <Link
                    to='/'
                    className={`header-navigator ${
                      pathname === '/' ? 'activetab' : ''
                    }`}>
                    Dashboard
                  </Link>{' '}
                </li>
                <li>
                  <Link
                    to='/salesdata'
                    className={`header-navigator ${
                      pathname === '/salesdata' ? 'activetab' : ''
                    }`}>
                    Sales
                  </Link>{' '}
                </li>
                <li className='nav-item dropdown header-profile dropdown '>
                  <a
                    className={`nav-link i-false ${
                      isMobile ? '' : 'dropdown-toggle'
                    }`}
                    style={{ cursor: 'pointer', width: '100%' }}
                    id='react-aria806600641-5'
                    aria-expanded='false'
                    data-bs-toggle='dropdown'>
                    <img
                      src={profileImage}
                      alt='propic'
                      className='profile-logo'
                    />
                  </a>
                  <div
                    x-placement='bottom-start'
                    aria-labelledby='react-aria806600641-5'
                    className='mt-3 dropdown-menu dropdown-menu-end dropdown-menu'
                    data-popper-reference-hidden='false'
                    data-popper-escaped='false'
                    data-popper-placement='bottom-start'>
                    {/* <Link
                          className='dropdown-item ai-icon'
                          to='/admin/profile'>
                          <svg
                            id='icon-user1'
                            xmlns='http://www.w3.org/2000/svg'
                            className='text-primary me-1'
                            width={18}
                            height={18}
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth={2}
                            strokeLinecap='round'
                            strokeLinejoin='round'>
                            <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
                            <circle cx={12} cy={7} r={4} />
                          </svg>
                          <span className='ms-2'>Profile </span>
                        </Link> */}
                    {/* <a
                          className='dropdown-item ai-icon'
                          href='/react/demo/email-inbox'>
                          <svg
                            id='icon-inbox'
                            xmlns='http://www.w3.org/2000/svg'
                            className='text-success me-1'
                            width={18}
                            height={18}
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth={2}
                            strokeLinecap='round'
                            strokeLinejoin='round'>
                            <path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' />
                            <polyline points='22,6 12,13 2,6' />
                          </svg>
                          <span className='ms-2'>Inbox </span>
                        </a> */}
                    <button className='dropdown-item ai-icon'>
                      <Link
                        to='/profile'
                        className='text-dark text-decoration-none'>
                        <svg
                          id='icon-user1'
                          xmlns='http://www.w3.org/2000/svg'
                          className='text-primary me-1'
                          width={18}
                          height={18}
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth={2}
                          strokeLinecap='round'
                          strokeLinejoin='round'>
                          <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
                          <circle cx={12} cy={7} r={4} />
                        </svg>
                        <span className='ms-2'>{profileDetails?.empName}</span>
                      </Link>
                    </button>
                    <button
                      className='dropdown-item ai-icon'
                      onClick={onClickLogout}
                      style={{ cursor: 'pointer' }}>
                      <svg
                        id='icon-logout'
                        xmlns='http://www.w3.org/2000/svg'
                        className='text-danger me-1'
                        width={18}
                        height={18}
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'>
                        <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
                        <polyline points='16 17 21 12 16 7' />
                        <line x1={21} y1={12} x2={9} y2={12} />
                      </svg>
                      <span className='ms-2'>Logout </span>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
