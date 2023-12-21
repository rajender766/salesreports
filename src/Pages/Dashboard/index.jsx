/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import moment from 'moment';

import Cookies from 'js-cookie';
import axios from 'axios';
import Swal from 'sweetalert2';

import './dashboard.css';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TablePagination from '@mui/material/TablePagination';
import Header from '../../components/Header';

var fileDownload = require('js-file-download');

const Dashboard = () => {
  const [fromDate, setfrom] = useState(null);
  const [toDate, setto] = useState(null);
  const [showResult, setshowResult] = useState(false);
  const [salesData, setData] = useState([]);
  const [records, setRecords] = useState(1000);
  const [updateTime, setUpdateTime] = useState('');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getReports(event, newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    getReports(event, 1, +event.target.value);
  };

  const handleSubmit = (e) => {
    setPage(0);
    getReports(e, 1);
  };

  const baseUrl = 'http://20.235.149.147:5001/api/v1/sales';

  useEffect(() => {
    document.title = 'PrimarySales | Data';
    const getdata = async () => {
      try {
        const url = `${baseUrl}/updatetime`;
        const response = await axios.post(url);
        setUpdateTime(response.data.AddedTime);
      } catch (e) {}
    };

    getdata();
  });

  const getReports = useCallback(
    async (e, pageNumber, limit) => {
      e.preventDefault();

      const limitofRecords = limit ? limit : rowsPerPage;

      const url = `${baseUrl}?page=${pageNumber ?? 1}&&limit=${limitofRecords}`;
      try {
        const dates = {
          fromDate: moment(fromDate.$d).format('DD-MM-YYYY'),
          toDate: moment(toDate.$d).format('DD-MM-YYYY'),
        };

        const jwtToken = Cookies.get('sales-token');

        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        };
        Swal.fire({
          allowOutsideClick: false,
          allowEscapeKey: false,
          didOpen: () => {
            Swal.showLoading();
          },

          text: 'We are currently searching for the information you requested. Please wait.',
        });

        const response = await axios.post(url, dates, { headers });

        if (response.status === 200) {
          Swal.close();
          setshowResult(true);
          setRecords(response.data.totalRecords);
          setData(response.data.data);
        } else {
          Swal.close();
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Oops',
            text: 'Something went wrong!',
          });
        }
      } catch (err) {
        Swal.close();
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'Oops',
          text: err.response
            ? `${err.response.data.message}`
            : 'Something went wrong!',
        });
      }
    },
    [fromDate, toDate, rowsPerPage, page]
  );

  const handleDownloadExcel = async () => {
    try {
      const durl = `${baseUrl}/downloadreports`;

      const jwtToken = Cookies.get('sales-token');
      const dates = {
        fromDate: moment(fromDate.$d).format('DD-MM-YYYY'),
        toDate: moment(toDate.$d).format('DD-MM-YYYY'),
      };

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      };

      Swal.fire({
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        },
        title: 'Downloading .....',
        text: 'Please wait',
      });

      // Send a POST request to the API to download the Excel file
      const response = await axios.post(durl, dates, {
        responseType: 'arraybuffer',
        headers,
      });

      if (response.status === 200) {
        Swal.close();
        fileDownload(response.data, 'sales.xlsx');
      }
    } catch (err) {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Oops',
        text: err.response
          ? `${err.response.statusText}`
          : 'Something went wrong!',
      });
    }
  };

  // Table Header  Columns and Name

  const header = [
    // 's.No',
    'InvoiceNo',
    'InvoiceDate',
    'PlantCode',
    'PlantName',
    'HQName',
    'CustomerName',
    'CustomerCity',
    'StateName',
    'MaterialCode',
    'MaterialName',
    'BrandName',
    'TherapeuticName',
    'SaleQty',
    'SaleAmount',
    'FreeQty',
    'ReturnQty',
    'ReturnAmount',
    'NetQty',
    'NetAmount',
    'TaxAmount',
    'TotalAmount',
    'AMName',
    'RMName',
    'DMName',
    'ZMName',
  ];

  // Table Row Values
  const MemoizedTableRow = useMemo(() => {
    return salesData.map((report, index) => (
      <tr key={index} className='body-content'>
        <td>{report.InvoiceNo}</td>
        <td>{report.InvoiceDate}</td>
        <td>{report.PlantCode}</td>
        <td>{report.PlantName}</td>
        <td>{report.HQName}</td>
        <td>{report.CustomerName}</td>
        <td>{report.CustomerCity}</td>
        <td>{report.StateName}</td>
        <td>{report.MaterialCode}</td>
        <td>{report.MaterialName}</td>
        <td>{report.BrandName}</td>
        <td>{report.TherapeuticName}</td>
        <td>{report.SaleQty}</td>
        <td>{report.SaleAmount}</td>
        <td>
          {report.FreeQty.includes('-')
            ? `-${report.FreeQty.replace('-', '')}`
            : report.FreeQty}
        </td>
        <td>
          {report.ReturnQty.includes('-')
            ? `-${report.ReturnQty.replace('-', '')}`
            : report.ReturnQty}
        </td>
        <td>
          {report.ReturnAmount.includes('-')
            ? `-${report.ReturnAmount.replace('-', '')}`
            : report.ReturnAmount}
        </td>
        <td>
          {report.NetQty.includes('-')
            ? `-${report.NetQty.replace('-', '')}`
            : report.NetQty}
        </td>
        <td>
          {report.NetAmount.includes('-')
            ? `-${report.NetAmount.replace('-', '')}`
            : report.NetAmount}
        </td>
        <td>
          {report.TaxAmount.includes('-')
            ? `-${report.TaxAmount.replace('-', '')}`
            : report.TaxAmount}
        </td>
        <td>
          {report.TotalAmount.includes('-')
            ? `-${report.TotalAmount.replace('-', '')}`
            : report.TotalAmount}
        </td>
        <td>{report.AMName}</td>
        <td>{report.RMName}</td>
        <td>{report.DMName}</td>
        <td>{report.ZMName}</td>
      </tr>
    ));
  }, [salesData]);

  return (
    <div style={{ height: '100vh' }}>
      <nav>
        <Header />
        <p className=' mx-4 mt-1 mb-0 text-primary d-inline'>
          Data Available UpTo: {updateTime}
        </p>
        <div className='row mx-4 p-0 d-md-flex my-0  justify-content-between form-container'>
          <form className='col-12 col-md-6 d-md-flex align-items-center'>
            <span className='d-flex date-tag'>Select Date :</span>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={['DatePicker', 'DatePicker']}
                sx={{ m: 3 }}>
                <DatePicker
                  label='From'
                  value={fromDate}
                  required={true}
                  format='DD-MM-YYYY'
                  maxDate={toDate}
                  onChange={(newValue) => setfrom(newValue)}
                  error={showResult && fromDate === null}
                  sx={{ width: '70px' }}
                />
                <DatePicker
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      marginLeft: -2,
                    },
                    '& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root': {
                      left: '-15px',
                    },
                    width: '70px',
                  }}
                  className='datepick'
                  label='To'
                  required={true}
                  value={toDate}
                  format='DD-MM-YYYY'
                  minDate={fromDate}
                  onChange={(newValue) => setto(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </form>
          <div className='col-12 col-md-6 d-flex justify-content-between   align-items-center'>
            <button
              className='search-btn  col-6 mt-2'
              onClick={handleSubmit}
              disabled={fromDate === null || toDate === null}>
              Search
            </button>
            <button
              disabled={salesData.length <= 0}
              onClick={handleDownloadExcel}
              className='col-6 btn bnt-lg download_btn mt-2 ms-2 m-md-0 '>
              Download Sheet
              <img src='../../download.svg' alt='hetero' className='m-1' />
            </button>
          </div>
        </div>
        <div>
          {showResult ? (
            <div className='row d-flex mt-1 mt-md-0  mx-4'>
              <span className='results-text col-12 col-md-6 align-self-center'>
                Total Records - {records}
              </span>
              <TablePagination
                className=' col-12  col-md-6 pagination-container'
                rowsPerPageOptions={[50, 100, 500]}
                component='div'
                count={records}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          ) : null}
        </div>
      </nav>

      {showResult ? (
        <div className='mx-4 mb-2  d-flex flex-column'>
          {salesData.length === 0 ? (
            <div className='d-flex align-items-center justify-content-center mt-5 p-5'>
              <h3 style={{ color: 'red' }}>No Result Found</h3>
            </div>
          ) : (
            <div className='table-container'>
              <table id='reports-data-table' className='table'>
                <thead className='sticky'>
                  <tr className='table-head-color'>
                    {header.map((title, i) => (
                      <td key={i}> {title} </td>
                    ))}
                  </tr>
                </thead>
                <tbody>{MemoizedTableRow}</tbody>
              </table>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Dashboard;
