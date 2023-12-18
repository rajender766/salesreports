/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import useMediaQuery from '@mui/material/useMediaQuery';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { Box } from '@mui/material';

import FacebookCircularProgress from './ProgressLoader';
import { Years } from './SelectInput';
import { colors } from '../Utils/Colors';

import './component.css';

export const TherapeuticGroup = () => {
  const [selectedYear, setSelectedYear] = useState(
    `${new Date().getFullYear()}`
  );
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);

  const baseurl = 'http://172.19.1.44:5001/api/v1/data';

  useEffect(() => {
    const getSales = async () => {
      try {
        const Url = `${baseurl}/therapeutic/sales`;
        const jwtToken = Cookies.get('sales-token');
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        };
        setLoading(true);
        const response = await axios.post(
          Url,
          { year: selectedYear },
          { headers }
        );

        setSales(response.data);

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getSales();
  }, [selectedYear]);

  const isMobile = useMediaQuery('(max-width: 600px)'); // Adjust the max-width value based on your breakpoint

  const legendProps = isMobile
    ? {
        direction: 'row',
        position: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        itemMarkWidth: 10,
        itemMarkHeight: 10,
      }
    : {
        direction: 'column',
        paddingRight: 15,
        paddingLeft: -10,
        position: {
          vertical: 'top',
          horizontal: 'right',
        },
        itemMarkWidth: 10,
        itemMarkHeight: 10,
      };

  const TOTAL =
    sales.length > 0
      ? sales.reduce((total, tab) => total + parseFloat(tab.TotalNetAmount), 0)
      : 0;

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    const percentage = (percent * 100).toFixed(0);
    return percentage > 4 ? `${percentage}%` : '';
  };

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
        <h3 className='graph-title'>TherapeuticGroup Sales NetAmount</h3>
        <Years year={selectedYear} setYear={setSelectedYear} />
      </Box>
      {sales.length === 0 && !loading ? (
        <div className='text-danger align-self-center my-5'>
          <h2>No Records Found</h2>
        </div>
      ) : (
        <PieChart
          series={[
            {
              data: sales.map((tab, i) => ({
                id: i,
                value: tab.TotalNetAmount,
                label: tab.TherapeuticName,
                color: colors[i],
              })),
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 30, additionalRadius: -0, color: 'gray' },
              cx: isMobile ? 150 : 190,
              arcLabel: getArcLabel,
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: 'white',
              fontSize: 15,
            },
          }}
          slotProps={{
            legend: legendProps,
          }}
          margin={{
            top: isMobile ? -70 : 10,
            bottom: isMobile ? 115 : 100,
            left: 1,
            right: 100,
          }}
          height={isMobile ? 450 : 413}
        />
      )}
    </div>
  );
};
