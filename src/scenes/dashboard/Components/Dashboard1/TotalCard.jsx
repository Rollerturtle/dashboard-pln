import React, { useMemo } from 'react';
import { Paper, Typography, Box, Avatar, Chip, useTheme } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { NewMockData } from '../../../../data/NewMockData';

const TotalCard = ({ title, bagian, icon: IconComponent }) => {
  const theme = useTheme();
  
  const latestYear = useMemo(() => {
    return Math.max(...NewMockData.map(item => item.Tahun));
  }, []);

  const previousYear = latestYear - 1;

  const calculateTotal = (year, bagian) => {
    return NewMockData
      .filter(item => item.Tahun === year && item.Bagian === bagian)
      .reduce((total, item) => total + item.Realisasi, 0);
  };

  const totalLatestYear = calculateTotal(latestYear, bagian);
  const totalPreviousYear = calculateTotal(previousYear, bagian);

  const calculateChangePercentage = (latest, previous) => {
    if (previous === 0) return '+100%';
    const change = ((latest - previous) / previous) * 100;
    return change.toFixed(2) + '%';
  };

  const changePercentage = calculateChangePercentage(totalLatestYear, totalPreviousYear);
  const isPositiveChange = changePercentage.startsWith('+');

  return (
    <Paper
      elevation={1}
      sx={{
        padding: 3,
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        height: '250px',
      }}
    >
      <Avatar
        sx={{
            bgcolor: isPositiveChange ? '#e0f4ec' : '#ffe4e4',
            color: isPositiveChange ? '#44c478' : '#d82c2c',
            width: 42,
            height: 42,
            borderRadius: '6px',
        }}
      >
        {IconComponent ? <IconComponent /> : <AttachMoneyIcon />}
      </Avatar>
      <Typography variant="h5" sx={{ mt: 2, mb: 1, fontSize:'1.1rem' }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{fontSize:'0.95rem'}}>
        Tahun Terakhir
      </Typography>
      <Typography variant="h4" sx={{ my: 1, fontSize:'0.95rem' }}>
        {totalLatestYear.toFixed(0)} M
      </Typography>
      <Chip
        label={changePercentage}
        sx={{
            bgcolor: isPositiveChange ? '#e0f4ec' : '#ffe4e4', 
            color: isPositiveChange ? '#44c478' : '#d82c2c',
            borderRadius: '4px',
            height: 24,
            fontSize:'1rem'
        }}
      />
    </Paper>
  );
};

export default TotalCard;
