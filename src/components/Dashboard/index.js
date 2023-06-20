import React, { useState } from 'react';
import moment from 'moment';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import './dashboard.css';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Dashboard = () => {
  const [formDate, setfrom] = useState({ $d: new Date() });
  const [toDate, setto] = useState({ $d: new Date() });

  console.log(moment(formDate.$d).format('DD-MM-YYYY'), toDate);

  const filterPatientsList = [
    {
      mobileNumber: '79y9345',
      registeredTime: '2014-08-12',
      doctorHq: 'HYD',
      state: 'telagaa',
      patientcode: 'iukdjfklu987897',
      patientName: 'dkhkjdshjd',
      city: 'knrhdb',
      mcode: '9u8r8u7r8e',
      mdis: 'ckdjkdjkcldkj',
      value: '-9958785',
    },
    {
      mobileNumber: '79y9345',
      registeredTime: '2014-08-12',
      doctorHq: 'HYD',
      state: 'telagaa',
      patientcode: 'iukdjfklu987897',
      patientName: 'dkhkjdshjd',
      city: 'knrhdb',
      mcode: '9u8r8u7r8e',
      mdis: 'ckdjkdjkcldkj',
      value: '-9958785',
    },
    {
      mobileNumber: '79y9345',
      registeredTime: '2014-08-12',
      doctorHq: 'HYD',
      state: 'telagaa',
      patientcode: 'iukdjfklu987897',
      patientName: 'dkhkjdshjd',
      city: 'knrhdb',
      mcode: '9u8r8u7r8e',
      mdis: 'ckdjkdjkcldkj',
      value: '-9958785',
    },
    {
      mobileNumber: '79y9345',
      registeredTime: '2014-08-12',
      doctorHq: 'HYD',
      state: 'telagaa',
      patientcode: 'iukdjfklu987897',
      patientName: 'dkhkjdshjd',
      city: 'knrhdb',
      mcode: '9u8r8u7r8e',
      mdis: 'ckdjkdjkcldkj',
      value: '-9958785',
    },
    {
      mobileNumber: '79y9345',
      registeredTime: '2014-08-12',
      doctorHq: 'HYD',
      state: 'telagaa',
      patientcode: 'iukdjfklu987897',
      patientName: 'dkhkjdshjd',
      city: 'knrhdb',
      mcode: '9u8r8u7r8e',
      mdis: 'ckdjkdjkcldkj',
      value: '-9958785',
    },
    {
      mobileNumber: '79y9345',
      registeredTime: '2014-08-12',
      doctorHq: 'HYD',
      state: 'telagaa',
      patientcode: 'iukdjfklu987897',
      patientName: 'dkhkjdshjd',
      city: 'knrhdb',
      mcode: '9u8r8u7r8e',
      mdis: 'ckdjkdjkcldkj',
      value: '-9958785',
    },
    {
      mobileNumber: '79y9345',
      registeredTime: '2014-08-12',
      doctorHq: 'HYD',
      state: 'telagaa',
      patientcode: 'iukdjfklu987897',
      patientName: 'dkhkjdshjd',
      city: 'knrhdb',
      mcode: '9u8r8u7r8e',
      mdis: 'ckdjkdjkcldkj',
      value: '-9958785',
    },
    {
      mobileNumber: '79y9345',
      registeredTime: '2014-08-12',
      doctorHq: 'HYD',
      state: 'telagaa',
      patientcode: 'iukdjfklu987897',
      patientName: 'dkhkjdshjd',
      city: 'knrhdb',
      mcode: '9u8r8u7r8e',
      mdis: 'ckdjkdjkcldkj',
      value: '-9958785',
    },
    {
      mobileNumber: '79y9345',
      registeredTime: '2014-08-12',
      doctorHq: 'HYD',
      state: 'telagaa',
      patientcode: 'iukdjfklu987897',
      patientName: 'dkhkjdshjd',
      city: 'knrhdb',
      mcode: '9u8r8u7r8e',
      mdis: 'ckdjkdjkcldkj',
      value: '-9958785',
    },
    {
      mobileNumber: '79y9345',
      registeredTime: '2014-08-12',
      doctorHq: 'HYD',
      state: 'telagaa',
      patientcode: 'iukdjfklu987897',
      patientName: 'dkhkjdshjd',
      city: 'knrhdb',
      mcode: '9u8r8u7r8e',
      mdis: 'ckdjkdjkcldkj',
      value: '-9958785',
    },
  ];

  return (
    <div className='bg-light'>
      <div className='d-flex align-items-center justify-content-between border-bottom border-dark p-3'>
        <img src='../../logo.svg' alt='hetero' className='navbar-logo' />
        <button className='navbar-btn_logout'>
          Log Out
          <img className='navbar-btn_img' src='../../logout.svg' alt='logout' />
        </button>
      </div>
      <div className='row mx-4 p-0 d-md-flex  justify-content-between'>
        <div className='col-md-9 d-md-flex align-items-center '>
          <span className='d-flex date-tag'>Select Date :</span>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={['DatePicker', 'DatePicker']}
              sx={{ m: 3 }}>
              <DatePicker
                label='From'
                value={formDate}
                format='DD-MM-YYYY'
                maxDate={toDate}
                onChange={(newValue) => setfrom(newValue)}
              />
              <DatePicker
                label='To'
                value={toDate}
                format='DD-MM-YYYY'
                minDate={formDate}
                onChange={(newValue) => setto(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>

          <button className='search-btn m-3'>Search</button>
        </div>
        <div className='col-md-3 btn bnt-lg download_btn m-3 m-md-0 '>
          <ReactHTMLTableToExcel
            id='test-table-xls-button'
            className='download-table-xls-button excel-btn mr-2'
            table='reports-data-table'
            filename='salesReports'
            sheet='reports'
            buttonText='Download Sheet'
          />
          <img src='../../download.svg' alt='hetero' className='m-1' />
        </div>
      </div>
      <div className='mx-4 mb-4'>
        <p className='results-text'>
          Showing Result {filterPatientsList.length}
        </p>
        <table
          id='reports-data-table'
          className='table  table-bordered table-boarderd  table-hover m-0 p-0'>
          <thead>
            <tr className='table-head-color'>
              <th>Inv.No</th>
              <th>Inv.Date</th>
              <th>Zone</th>
              <th>State</th>
              <th>HQ</th>
              <th>Division</th>
              <th>Customer Code</th>
              <th>Customer Name</th>
              <th>City</th>
              <th>Material Code</th>
              <th>Material Description</th>
              <th>Net Value</th>
            </tr>
          </thead>
          <tbody>
            {filterPatientsList.map((patient, index) => (
              <tr key={index} className='body-content'>
                <td>{patient.mobileNumber}</td>
                <td>{moment(patient.registeredTime).format('DD-MM-YYYY')}</td>
                <td>{patient.doctorHq}</td>
                <td>{patient.doctorHq}</td>
                <td>{patient.state}</td>
                <td>{patient.doctorHq}</td>
                <td>{patient.patientcode}</td>
                <td>{patient.patientName}</td>

                <td>{patient.city}</td>

                <td>{patient.mcode}</td>
                <td>{patient.mdis}</td>
                <td>{patient.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
