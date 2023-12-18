/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Cookies from 'js-cookie';
import axios from 'axios';

import { Box, useMediaQuery } from '@mui/material';

import FacebookCircularProgress from './ProgressLoader';

import Swal from 'sweetalert2';
import { SelectOption, Years } from './SelectInput';

const HqWiseSales = () => {
  const [selectedYear, setSelectedYear] = useState(
    `${new Date().getFullYear()}`
  );
  const [selectedHq, setHq] = useState('');
  const [hqData, setHqData] = useState([]);
  const [sales, setSales] = React.useState([]);

  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const baseurl = 'http://172.19.1.44:5001/api/v1/data';

  useEffect(() => {
    const getData = async () => {
      try {
        const brandurl = `${baseurl}/hqs`;

        const jwtToken = Cookies.get('sales-token');
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        };
        setLoading(true);
        const response = await axios.get(brandurl, { headers });
        const data = response.data.map((obj) => ({
          code: obj.HQCode,
          name: obj.HQName,
        }));
        setHqData(data);
        setHq(data[0].code);
        setLoading(false);
      } catch (e) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong',
          showCloseButton: true,
          confirmButtonText: 'OK',
        });
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getSales = async () => {
      try {
        const Url = `${baseurl}/hq/sales`;
        const jwtToken = Cookies.get('sales-token');
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        };
        setLoading(true);
        const response = await axios.post(
          Url,
          { selectedHq, year: selectedYear },
          { headers }
        );

        setSales(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong',
          showCloseButton: true,
          confirmButtonText: 'OK',
        });
      }
    };
    getSales();
  }, [selectedHq, selectedYear]);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const salesData = months.map((month, i) => {
    const sale = sales.find((sale) => sale.MonthName === i + 1);
    if (sale) {
      return { ...sale, MonthName: month };
    } else {
      return {
        MonthName: month,
        TotalNetAmount: 0,
      };
    }
  });

  return (
    <div className='graph-main-container'>
      {loading && <FacebookCircularProgress />}
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <h3 className='graph-title m-0'>Hq Wise Sales NetAmount</h3>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: isMobile ? 2 : 0,
          }}>
          <SelectOption
            label={'Hq'}
            data={hqData}
            option={selectedHq}
            setOption={setHq}
          />
          <Years year={selectedYear} setYear={setSelectedYear} />
        </Box>
      </Box>
      {sales.length === 0 && !loading && (
        <div className='text-danger align-self-center my-5'>
          <h2>No Records Found</h2>
        </div>
      )}
      {sales.length > 0 && (
        <BarChart
          height={500}
          margin={{ left: 100, bottom: 80 }}
          slotProps={{
            legend: { hidden: true },
          }}
          series={[
            {
              data: salesData.map((hq) => hq.TotalNetAmount),
              label: 'NetAmount',
              id: 'pvId',
            },
          ]}
          xAxis={[
            {
              data: salesData.map((hq) => hq.MonthName),
              scaleType: 'band',
              tickLabelStyle: {
                angle: 320,
                dominantBaseline: 'hanging',
                textAnchor: 'end',
              },
              labelStyle: {
                transform: 'translateY(15px)',
              },
            },
            { min: 10, max: 50, scaleType: 'linear' },
          ]}
        />
      )}
    </div>
  );
};

export default HqWiseSales;
