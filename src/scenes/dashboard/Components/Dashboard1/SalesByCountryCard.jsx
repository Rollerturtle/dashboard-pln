import React, { useState } from 'react';
import { Paper, Typography, Box, Avatar, Stack, useTheme, IconButton, Menu, MenuItem, FormControl, InputLabel, Select, Button } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';
import { NewMockData } from '../../../../data/NewMockData';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';

const SalesByCountryCard = () => {
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

  // Get unique years from NewMockData
  const years = [...new Set(NewMockData.map(item => item.Tahun.toString()))];

  // Filter data based on the selected year
  const filteredData = selectedYear === 'All'
    ? NewMockData
    : NewMockData.filter(item => item.Tahun.toString() === selectedYear);

  // Transform data for the component
  const units = [...new Set(NewMockData.map(item => item.Unit))];
  const salesData = units.map(unit => {
    const unitData = filteredData.filter(item => item.Unit === unit && item.Bagian === 'Penjualan');
    const sales = unitData.reduce((total, item) => total + item.Realisasi, 0);

    const previousYear = selectedYear === 'All' ? 'All' : (parseInt(selectedYear) - 1).toString();
    const previousData = previousYear === 'All'
      ? NewMockData.filter(item => item.Unit === unit && item.Bagian === 'Penjualan')
      : NewMockData.filter(item => item.Unit === unit && item.Bagian === 'Penjualan' && item.Tahun.toString() === previousYear);

    const previousSales = previousData.reduce((total, item) => total + item.Realisasi, 0);
    const change = previousSales === 0 ? 0 : ((sales - previousSales) / previousSales) * 100;

    return {
      unit,
      sales: Math.round(sales),
      change: selectedYear === 'All' || selectedYear === '2019' ? 0 : change.toFixed(1),
      changeColor: change === 0 ? theme.palette.grey[500] : change > 0 ? theme.palette.success.main : theme.palette.error.main,
      avatarBgColor: change === 0 ? theme.palette.grey[500] : change > 0 ? "#4CAF50" : "#F44336"
    };
  });

  return (
    <Paper sx={{ 
      padding: 2,
      borderRadius: '16px',
      backgroundColor: theme.palette.background.paper,
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      height: 'Auto'
      }}>
      <Box sx={{ padding: 2, pb: 0.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h5" gutterBottom sx={{ fontSize: '1.25rem' }}>
            Penjualan Tenaga Listrik
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom sx={{ mb: 4, fontSize: '1rem' }}>
            Ikhtisar Penjualan Tenaga Listrik Tahunan
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
      {salesData.map((item, index) => (
        <Stack
          key={index}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Avatar sx={{ borderRadius: 2, width: 40, height: 40, backgroundColor: item.avatarBgColor }} > 
            <ElectricBoltIcon/>
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 'normal', fontSize: '1.2rem' }}>{item.sales} GWh</Typography>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography variant="body2" color="text.secondary" sx={{ minWidth: '25%', fontSize: '0.85rem' }}>
                {item.unit}
              </Typography>
            </Stack>
          </Box>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            {item.change > 0 ? <ExpandLessIcon color="success" /> : item.change < 0 ? <ExpandMoreIcon color="error" /> : <></>}
            <Typography variant="body2" color={item.change === 0 ? "text.secondary" : (item.change > 0 ? "success.main" : "error.main")} sx={{ fontSize: '1rem' }}>
              {Math.abs(item.change)}%
            </Typography>
          </Stack>
        </Stack>
      ))}
    </Paper>
  );
};

export default SalesByCountryCard;
