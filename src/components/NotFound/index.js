import React from 'react';

import './index.css';

const NotFound = () => {
  return (
    <div className='main-contaer-notfound '>
      <h1 className='head-code'>404</h1>
      <div className='cloak__wrapper'>
        <div className='cloak__container'>
          <div className='cloak'></div>
        </div>
      </div>
      <div className='info'>
        <h2>We can't find that page</h2>
        <p className='not-found-discreption'>
          We're fairly sure that page used to be here, but seems to have gone
          missing. We do apologise on it's behalf.
        </p>
        <a className='home-link' href='/' rel='noreferrer noopener'>
          Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
