/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';

import {
  Box,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
} from '@mui/material';

import FacebookCircularProgress from './ProgressLoader';
import { SelectOption, Years } from './SelectInput';
import { Months } from '../Utils/Months';

import './component.css';
import { handleApiError } from '../Utils/Error';

const CoustomerSales = () => {
  const [selectedYear, setSelectedYear] = useState(
    `${new Date().getFullYear()}`
  );
  const [selectedHq, setHq] = useState('');
  const [coustomerCode, setCoustomerCode] = useState('');
  const [hqData, setHqData] = useState([]);
  const [coustomers, setCoustomers] = useState([]);
  const [sales, setSales] = React.useState([]);
  const [loading, setLoading] = useState(false);

  const [chartType, setChartType] = useState('Quantity');

  const isMobile = useMediaQuery('(max-width: 768px)');

  const baseurl = 'http://192.168.137.1:5001/api/v1/data';

  useEffect(() => {
    const getHqData = async () => {
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
        setLoading(false);
        handleApiError(e);
      }
    };
    getHqData();
  }, []);

  useEffect(() => {
    const getCustomerData = async () => {
      try {
        const brandurl = `${baseurl}/customers`;

        const jwtToken = Cookies.get('sales-token');
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        };
        setLoading(true);
        const response = await axios.post(
          brandurl,
          { hqCode: selectedHq },
          { headers }
        );
        const data = response.data.map((obj) => ({
          code: obj.CustomerCode,
          name: obj.CustomerName,
        }));
        setCoustomers(data);
        setCoustomerCode(data[0] ? data[0].code : '');
        setLoading(false);
      } catch (e) {
        setLoading(false);
        handleApiError(e);
      }
    };
    getCustomerData();
  }, [selectedHq]);

  useEffect(() => {
    const getSales = async () => {
      try {
        const Url = `${baseurl}/customer/sales`;
        const jwtToken = Cookies.get('sales-token');
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        };
        setLoading(true);
        const response = await axios.post(
          Url,
          { coustomerCode, year: selectedYear },
          { headers }
        );
        setSales(response.data);
        setLoading(false);
      } catch (error) {
        handleApiError(error);
      }
    };
    getSales();
  }, [coustomerCode, selectedYear]);

  const salesData = Months.map((month, i) => {
    const sale = sales.find((sale) => sale.SaleMonth === i + 1);

    if (sale) {
      return { ...sale, MonthName: month };
    } else {
      return {
        MonthName: month,
        SaleMonth: 0,
        TotalSaleQty: 0,
        TotalReturnQty: 0,
        TotalNetQty: 0,
        TotalFreeQty: 0,
        TotalSaleAmount: 0,
        TotalReturnAmount: 0,
        TotalNetAmount: 0,
      };
    }
  });

  const handleChartType = (event, newChartType) => {
    if (newChartType !== null) {
      setChartType(newChartType);
    }
  };

  return (
    <div className='graph-main-container'>
      {loading && <FacebookCircularProgress />}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <h3 className='graph-title m-0'>Coustomer Wise Sales</h3>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: isMobile ? 2 : 0,
          }}>
          <SelectOption
            label={'Hq'}
            data={hqData}
            option={selectedHq}
            setOption={setHq}
          />
          <SelectOption
            label={'Coustomer'}
            data={coustomers}
            option={coustomerCode}
            setOption={setCoustomerCode}
          />
          <Years year={selectedYear} setYear={setSelectedYear} />
        </Box>
      </Box>
      <Stack
        direction={{ xs: 'column', xl: 'row' }}
        spacing={1}
        sx={{ width: '100%' }}>
        <Box>
          <ToggleButtonGroup
            value={chartType}
            exclusive
            onChange={handleChartType}
            aria-label='chart type'
            fullWidth>
            {['Quantity', 'Amounts'].map((type) => (
              <ToggleButton key={type} value={type} aria-label='left aligned'>
                {type}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
        {sales.length === 0 && !loading ? (
          <div className='text-danger align-self-center my-5'>
            <h2>No Records Found</h2>
          </div>
        ) : (
          <Box>
            {chartType === 'Quantity' && (
              <LineChart
                height={350}
                series={[
                  {
                    data: salesData.map((sale) => sale.TotalSaleQty),
                    label: 'SaleQty',
                    area: true,
                    showMark: false,
                  },
                  {
                    data: salesData.map((sale) => sale.TotalReturnQty),
                    label: 'ReturnQty',
                    color: '#e15759',
                    area: true,
                    showMark: false,
                  },
                  {
                    data: salesData.map((sale) => sale.TotalNetQty),
                    label: 'NetQty',
                    color: '#4e79a7',
                    area: true,
                    showMark: false,
                  },
                  {
                    data: salesData.map((sale) => sale.TotalFreeQty),
                    label: 'FreeQty',
                    color: '#edc949',
                    area: true,
                    showMark: false,
                  },
                ]}
                xAxis={[
                  {
                    scaleType: 'point',
                    data: Months,
                    tickLabelStyle: {
                      angle: 325,
                      dominantBaseline: 'hanging',
                      textAnchor: 'end',
                    },
                    labelStyle: {
                      transform: 'translateY(15px)',
                    },
                  },
                ]}
                animate={{
                  onLoad: { duration: 3000 }, // Optional: animation when the chart initially loads
                }}
                margin={{ left: 80, bottom: 75 }}
                slotProps={{
                  legend: {
                    hidden: true,
                  },
                }}
              />
            )}
            {chartType === 'Amounts' && (
              <BarChart
                height={350}
                margin={{ left: 100, bottom: 80 }}
                slotProps={{
                  legend: { hidden: true },
                }}
                series={[
                  {
                    data: salesData.map((cus) => cus.TotalSaleAmount),
                    label: 'SaleAmount ₹',
                    id: 'sale',
                  },
                  {
                    data: salesData.map((cus) => cus.TotalReturnAmount),
                    label: 'ReturnAmount ₹',
                    id: 'return',
                    color: '#e15759',
                  },
                  {
                    data: salesData.map((cus) => cus.TotalNetAmount),
                    label: 'NetAmount ₹',
                    id: 'Net',
                    color: '#27f587',
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
          </Box>
        )}
      </Stack>
    </div>
  );
};

export default CoustomerSales;
