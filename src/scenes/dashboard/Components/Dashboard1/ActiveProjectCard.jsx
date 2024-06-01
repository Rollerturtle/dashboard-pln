import React, { useState, useMemo } from 'react';
import { Paper, Typography, Box, LinearProgress, Avatar, IconButton, Menu, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { NewMockData } from '../../../../data/NewMockData';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { styled, useTheme } from '@mui/material/styles';

const ActiveProjectsCard = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedYear, setSelectedYear] = useState('All');

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleReset = () => {
    setSelectedYear('All');
  };

  const years = [...new Set(NewMockData.map(item => item.Tahun.toString()))];

  const salesData = useMemo(() => {
    return NewMockData
      .filter(item => selectedYear === 'All' || item.Tahun.toString() === selectedYear)
      .reduce((acc, curr) => {
        if (!acc[curr.Unit]) {
          acc[curr.Unit] = { realisasi: 0, target: 0 };
        }
        if (curr.Bagian === 'Pendapatan') {
          acc[curr.Unit].realisasi += curr.Realisasi;
          acc[curr.Unit].target += curr.Target;
        }
        return acc;
      }, {});
  }, [selectedYear]);

  const calculateProgress = (realisasi, target) => {
    const progress = Math.min(100, Math.round((realisasi / target) * 100));
    return progress;
  };

  const getProgressColor = (progress) => {
    if (progress >= 100) return "#4CAF50";
    else if (progress >= 75) return "#FF9800";
    else return "#F44336";
  };

  return (
    <Paper sx={{ 
      padding: 3, 
      borderRadius: '16px', 
      backgroundColor: theme.palette.background.paper,
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'
    }}>
      <Box sx={{ padding: 2, pb: 0.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h5" gutterBottom sx={{ fontSize: '1.25rem' }}>
            Pendapatan Tenaga Listrik
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom sx={{ mb: 4, fontSize: '1rem' }}>
            Ikhtisar Pendapatan Tenaga Listrik Tahunan
          </Typography>
        </Box>
        <IconButton onClick={handleMenuOpen} sx={{mt:-3}}>
          <FilterListIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Box sx={{ padding: 2 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Year</InputLabel>
              <Select value={selectedYear} onChange={handleYearChange}>
                <MenuItem value="All"><em>All</em></MenuItem>
                {years.map((year) => (
                  <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button onClick={handleReset} fullWidth variant="contained" sx={{ backgroundColor: 'red', color: 'white' }}>
              Reset
            </Button>
          </Box>
        </Menu>
      </Box>
      {Object.keys(salesData).map((unit, index) => {
        const progress = calculateProgress(salesData[unit].realisasi, salesData[unit].target);
        const progressColor = getProgressColor(progress);
        return (
          <Box key={index} sx={{ 
            marginBottom: 2, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between' 
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ backgroundColor: progressColor, borderRadius: 2, width: 40, height: 40, marginRight: 2 }} > 
                <AttachMoneyIcon />
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column', mr: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 'normal', fontSize: '1.2rem' }}>{Math.round(salesData[unit].realisasi)} M</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ minWidth: '25%', fontSize: '0.85rem' }}>{unit}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '200px' }}>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  width: '100%',
                  height: '10px',
                  borderRadius: '5px',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: progressColor,
                  },
                }}
              />
              <Typography variant="body2" sx={{ ml: 2, color: progressColor }}>
                {progress}%
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Paper>
  );
};

export default ActiveProjectsCard;
