import React, { useMemo } from 'react';
import { Paper, Typography, Box, useTheme, styled } from '@mui/material';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { NewMockData } from "../../../../data/NewMockData";  // Assume this is the correct import path

const SalesCard = () => {
  const theme = useTheme();

  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const data = useMemo(() => {
    return months.map(month => {
      const relevantData = NewMockData.filter(item => item.Bulan === month && item.Bagian === "Pendapatan");
      const average = relevantData.reduce((sum, item) => sum + item.Realisasi, 0) / (relevantData.length || 1);
      return { date: `${month}`, sales: average };
    });
  }, []);

  const janValue = data[0].sales;
  const decValue = data[data.length - 1].sales;
  const difference = decValue - janValue;
  const percentageChange = ((difference / janValue) * 100).toFixed(2);
  const color = percentageChange >= 0 ? 'success' : 'error';

  return (
    <Paper sx={{
      padding: '20px',
      borderRadius: '15px',
      backgroundColor: theme.palette.background.paper,
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      height: '250px',
    }}>
      <Typography variant="h5" color="textPrimary" sx={{ fontSize: '1.5rem' }}>
        Pendapatan
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ fontSize: '1rem' }}>
        Avg. Pendapatan Bulanan
      </Typography>
      <Box sx={{ height: '60%', pt: 1, mt: 2, }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={theme.palette[color].main} stopOpacity={0.3}/>
                <stop offset="30%" stopColor={theme.palette[color].main} stopOpacity={0.1}/>
                <stop offset="60%" stopColor={theme.palette[color].main} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="date" hide={true} />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="sales" 
              stroke={theme.palette[color].main} 
              fillOpacity={1} 
              fill="url(#colorSales)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{mt:-2.5}} >
        <Typography variant="h5" sx={{ fontSize: '1.25rem' }}>{Math.abs(difference).toFixed(2)}k</Typography>
        <Typography variant="body2" sx={{ color: theme.palette[color].main, fontSize: '0.875rem' }}>
          {percentageChange >= 0 ? `+${percentageChange}%` : `${percentageChange}%`}
        </Typography>
      </Box>
    </Paper>
  );
};

export default SalesCard;
