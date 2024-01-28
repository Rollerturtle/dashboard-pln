import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const NewPieChart = ({ data }) => {

  const innerRadius = 0.5;

  return (
    <PieChart
      series={[
        {
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 150, additionalRadius: -30, color: 'gray' }, // Convert ratio to percentage for innerRadius
          innerRadius: 150, // The radius of the inner circle to create the donut effect
          outerRadius: 300,
        },
      ]}
      height={700}
    />
  );
};

export default NewPieChart;
