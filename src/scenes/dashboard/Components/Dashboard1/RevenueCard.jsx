import React from 'react';
import { Paper, Typography, Box, Avatar, useTheme } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { BarChart, Bar, ResponsiveContainer, XAxis, Cell } from 'recharts';

const RevenueGrowthCard = () => {
  const theme = useTheme();

  const data = [
    { name: 'M', value: 65 },
    { name: 'T', value: 59 },
    { name: 'W', value: 80 },
    { name: 'T', value: 81 },
    { name: 'F', value: 56 },
    { name: 'S', value: 55 },
    { name: 'S', value: 40 },
  ];

  // Calculate the max data value for setting the bar fill opacity
  const maxValue = Math.max(...data.map(d => d.value));
  
  const CustomBar = (props) => {
    const { fill, x, y, width, height } = props;
    return (
      <g>
        <rect x={x} y={y} width={width} height={height} rx={10} ry={10} fill={fill} />
      </g>
    );
  };

  return (
    <Paper sx={{
      padding: theme.spacing(3),
      borderRadius: '16px',
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.palette.background.paper,
      height: '250px', // Adjust based on your needs
    }}>
      <Box>
        <Typography variant="overline" color="textSecondary">
          Revenue Growth
        </Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>
          Weekly Report
        </Typography>
        <Typography variant="h3" sx={{ mt: 1 }}>
          $4,673
        </Typography>
        <Typography variant="subtitle1" color="success.main" sx={{ mt: 1 }}>
          +15.2%
        </Typography>
      </Box>
      <ResponsiveContainer width="50%" height="100%">
        <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <Bar dataKey="value" fill={theme.palette.primary.main} shape={<CustomBar />}>
            {
              data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.value === maxValue ? '#2e7d32' : '#81c784'}
                />
              ))
            }
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default RevenueGrowthCard;