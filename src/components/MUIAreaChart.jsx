// NewAreaChart.jsx
import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const NewAreaChart = ({ data }) => {
  // Assuming data is an array of objects with { month, Target, Realisasi }
  const seriesData = data.map(item => ({
    ...item,
    uv: item.Target, // Rename as needed for the series
    pv: item.Realisasi // Rename as needed for the series
  }));

  return (
    <LineChart
      width={1000}
      height={700}
      series={[
        { data: seriesData.map(item => item.uv), label: 'Target', area: true, stack: 'total', showMark: false },
        { data: seriesData.map(item => item.pv), label: 'Realisasi', area: true, stack: 'total', showMark: false },
      ]}
      xAxis={[{ scaleType: 'point', data: seriesData.map(item => item.month) }]}
      sx={{
        '.MuiLineElement-root': {
          display: 'none',
        },
      }}
    />
  );
};

export default NewAreaChart;
