import React, { useMemo } from 'react';
import { Paper, Typography, Box, useTheme, styled } from '@mui/material';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell, Rectangle } from 'recharts';
import { NewMockData } from "../../../../data/NewMockData";  // Assume this is the correct import path

const OrderCard = () => {
  const theme = useTheme();

  // Calculate the monthly averages
  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const data = useMemo(() => {
    return months.map(month => {
      const relevantData = NewMockData.filter(item => item.Bulan === month && item.Bagian === "Penjualan");
      const average = relevantData.reduce((sum, item) => sum + item.Realisasi, 0) / (relevantData.length || 1);
      return { month, average };
    });
  }, []);

  // Find the maximum value for dynamic coloring
  const maxValue = Math.max(...data.map(d => d.average));

  const CustomBar = (props) => {
    const { fill, x, y, width, height } = props;
    return <rect x={x} y={y} width={width} height={height} rx={10} ry={10} fill={fill} />;
  };

  const janValue = data[0].average; // January
  const decValue = data[11].average; // December
  const difference = decValue - janValue;
  const percentageChange = ((difference / janValue) * 100).toFixed(2);

  return (
    <Paper sx={{
      padding: '20px',
      borderRadius: '15px',
      backgroundColor: theme.palette.background.paper,
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      height: '250px',
    }}>
      <Typography variant="h5" color="textPrimary" sx={{ fontSize: '1.5rem' }}>
        Penjualan
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ fontSize: '1rem' }}>
        Avg. Penjualan Bulanan
      </Typography>
      <Box sx={{ pt: 0.5, pb: 0.5, mt:2 }}>
        <ResponsiveContainer width="100%" height={100}>
          <BarChart data={data}>
            <XAxis dataKey="month" axisLine={false} tickLine={false} tickFormatter={(month) => month.substring(0, 3)} />
            <Tooltip />
            <Bar dataKey="average" fill={theme.palette.primary.main} shape={<CustomBar />}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.average === maxValue ? '#1565c0' : '#90caf9'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" sx={{ fontSize: '1.25rem' }}>{Math.abs(difference).toFixed(2)}k</Typography>
        <Typography variant="body2" sx={{ color: percentageChange >= 0 ? 'success.main' : 'error.main', fontSize: '0.875rem' }}>
          {percentageChange >= 0 ? `+${percentageChange}%` : `${percentageChange}%`}
        </Typography>
      </Box>
    </Paper>
  );
};

export default OrderCard;