// PieChart.js
import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { useTheme } from '@mui/material';

const PieChart = () => {
  const theme = useTheme();

  // Dummy data
  const data = [
    {
      "id": "category1",
      "label": "Category 1",
      "value": 100,
      "color": "hsl(206, 70%, 50%)"
    },
    {
      "id": "category2",
      "label": "Category 2",
      "value": 200,
      "color": "hsl(56, 70%, 50%)"
    },
    {
      "id": "category3",
      "label": "Category 3",
      "value": 300,
      "color": "hsl(286, 70%, 50%)"
    }
  ];

  return (
    <div style={{ height: '250px' }}>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: 'nivo' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        enableRadialLabels={false}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="#333333"
      />
    </div>
  );
};

export default PieChart;
