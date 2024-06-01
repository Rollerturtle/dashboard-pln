import React from 'react';
import { useTheme, Box, Typography, Paper } from '@mui/material';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const DailySalesCard = () => {
  const theme = useTheme();
  const data = [
    // Replace with your actual data
    { day: 'Day 1', sales: 2400 },
    { day: 'Day 2', sales: 2210 },
    { day: 'Day 3', sales: 2290 },
    { day: 'Day 4', sales: 2000 },
    // ... more data
  ];

  return (
    <Paper elevation={3} sx={{
      borderRadius: '15px',
      backgroundColor: theme.palette.background.paper,
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      position: 'relative', // Assuming you want to position something absolutely inside
      overflow: 'hidden', // To handle the overflow of children, if any
      height: 300, // Adjust as needed
    }}>
    <Box sx={{
      padding: theme.spacing(3), // Moved padding here
      height: '100%', // Set the height to 100% to fill the Paper component
      boxSizing: 'border-box', // Ensures padding doesn't add to the height
    }}>
      <Typography variant="h5" color="textPrimary" gutterBottom component="div" sx={{ fontSize: '1.25rem', mb:1.5 }}>
        Average Daily Sales
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom component="div" sx={{ fontSize: '1rem' }}>
        Total Sales This Month
      </Typography>
      <Typography variant="h4" sx={{ mb: 0.5, fontSize: '2rem' }}>
        $28,450
      </Typography>
      <Box sx={{ height: '60%', position: 'relative', mt:6 }}>
      <ResponsiveContainer width="100%" height="100%" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34c38f" stopOpacity={0.8}/>
                <stop offset="50%" stopColor="#ffffff" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <XAxis dataKey="day" hide={true} />
            <YAxis hide={true} />
            <Tooltip />
            <Area 
                type="monotone" 
                dataKey="sales" 
                stroke="#34c38f" 
                fillOpacity={1} 
                fill="url(#colorSales)"
            />
            </AreaChart>
        </ResponsiveContainer>
      </Box>
      </Box>
      {/* ...other components/elements you might want to include */}
    </Paper>
  );
};

export default DailySalesCard;
