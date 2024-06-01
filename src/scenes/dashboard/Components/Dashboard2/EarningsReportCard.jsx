import React, {useState} from 'react';
import { Paper, Card, CardHeader, CardContent, Typography, IconButton, Chip, Box, Avatar, LinearProgress, Menu, MenuItem, useTheme } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert'; // Example icon for the action button
import DollarIcon from '@mui/icons-material/AttachMoney'; // Example icon for the Avatar
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'; // for the Earnings icon
// Import Recharts components
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';


function EarningsReportCard() {
  
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const data = [
    { name: 'Mo', earnings: 200 },
    { name: 'Tu', earnings: 300 },
    { name: 'We', earnings: 150 },
    { name: 'Th', earnings: 280 },
    { name: 'Fr', earnings: 500 },
    { name: 'Sa', earnings: 260 },
    { name: 'Su', earnings: 220 },
  ];

  return (
    <Paper elevation={3} sx={{ borderRadius: '15px', p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h6" sx={{fontSize: '1.5rem',}}>Earning Reports</Typography>
      <IconButton aria-label="settings" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Last Week</MenuItem>
        <MenuItem onClick={handleClose}>Last Month</MenuItem>
        <MenuItem onClick={handleClose}>Last Year</MenuItem>
      </Menu>
    </Box>
    <Typography variant="subtitle1" color="textSecondary" gutterBottom sx={{fontSize: '1.15rem',}}>
      Weekly Earnings Overview
    </Typography>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', mr: 2, width: '50%' }}>
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Typography variant="h4" component="span" sx={{ fontWeight: 'normal', mr: 1, fontSize: '3rem' }}>
      $468
    </Typography>
    <Chip
      label="+4.2%"
      sx={{
        borderRadius: '4px',
        backgroundColor: '#dcf6e8', // Light green background color
        color: '#2cc46c', // Dark green text color
        fontWeight: 'bold',
        fontSize: '0.875rem', // Adjust the font size as needed
        // If you need to apply additional styling to the text, target the label like so:
        '& .MuiChip-label': {
          color: '#2cc46c', // Ensuring the text color inside the chip matches the dark green color
        }
      }}
    />
      </Box>
      <Typography variant="subtitle2" color="textSecondary" sx={{ opacity: 0.7, fontSize: '0.90rem' }}>
        You informed of this week compared to last week
      </Typography>
    </Box>
    <ResponsiveContainer width="50%" height={200}> {/* Use full width for responsiveness and reduced height */}
      <BarChart 
      data={data} 
      margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
    >
        <XAxis 
          dataKey="name" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: theme.palette.text.secondary }} // Use theme.palette.text.secondary for the tick color
        />
        <YAxis hide />
        <Tooltip />
        <Bar 
          dataKey="earnings" 
          fill="#8884d8" 
          radius={5} 
          barSize={20} // Adjust the bar size as needed to reduce the width of the bars
        >
          {
            data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === 4 ? '#4a90e2' : '#c7d0f8'} />
            ))
          }
        </Bar>
      </BarChart>
    </ResponsiveContainer>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', p: 2, border: 1, borderColor: 'divider', borderRadius: 2, mt: 1, mb: 2 }}>
            {/* Earnings Box */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{
                bgcolor: 'success.light',
                color: 'success.contrastText',
                borderRadius: '12px', // for the rounded box appearance
                width: 32, // smaller width
                height: 32, // smaller height
              }}>                  <AccountBalanceWalletIcon />
                </Avatar>
                <Typography variant="body1" gutterBottom>
                  Earnings
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'medium', fontSize: '1.5rem' }}>
                $545.69
              </Typography>
              <LinearProgress variant="determinate" value={70} sx={{ width: '100%', maxWidth: '85%', height: 6, borderRadius: 5, mr: 2 }} />
            </Box>

            {/* Earnings Box */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{
                bgcolor: 'success.light',
                color: 'success.contrastText',
                borderRadius: '12px', // for the rounded box appearance
                width: 32, // smaller width
                height: 32, // smaller height
              }}>
                  <AccountBalanceWalletIcon />
                </Avatar>
                <Typography variant="body1" gutterBottom>
                  Earnings
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'medium', fontSize: '1.5rem' }}>
                $545.69
              </Typography>
              <LinearProgress variant="determinate" value={70} sx={{ width: '100%', maxWidth: '85%', height: 6, borderRadius: 5, mr: 2 }} />
            </Box>

            {/* Earnings Box */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{
                bgcolor: 'success.light',
                color: 'success.contrastText',
                borderRadius: '12px', // for the rounded box appearance
                width: 32, // smaller width
                height: 32, // smaller height
              }}>                  <AccountBalanceWalletIcon />
                </Avatar>
                <Typography variant="body1" gutterBottom>
                  Earnings
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'medium', fontSize: '1.5rem' }}>
                $545.69
              </Typography>
              <LinearProgress variant="determinate" value={70} sx={{ width: '100%', maxWidth: '85%', height: 6, borderRadius: 5, mr: 2 }} />
            </Box>
      {/* Repeat the above for Profit and Expense */}
    </Box>
  </Paper>
  );
}

export default EarningsReportCard;
