import React, { useState } from 'react';
import { Paper, Typography, useTheme, Box, IconButton, Menu, MenuItem, FormControl, InputLabel, Select, Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import { NewMockData } from '../../../../data/NewMockData';

const RadarCard = () => {
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

  // Transform data for the radar chart
  const units = [...new Set(filteredData.map(item => item.Unit))];
  const radarData = units.map(unit => {
    const unitData = filteredData.filter(item => item.Unit === unit);

    // Accumulate data for each section
    const pendapatan = unitData
      .filter(item => item.Bagian === 'Pendapatan')
      .reduce((total, item) => total + item.Realisasi, 0);

    const tunggakan = unitData
      .filter(item => item.Bagian === 'Pengendalian Piutang Saldo Tunggakan')
      .reduce((total, item) => total + item.Realisasi, 0);

    const prabayar = unitData
      .filter(item => item.Bagian === 'Penurunan Saldo Piutang Prabayar')
      .reduce((total, item) => total + item.Realisasi, 0);

    return {
      subject: unit,
      Pendapatan: pendapatan,
      Tunggakan: tunggakan,
      Prabayar: prabayar,
    };
  });

  return (
    <Paper sx={{
      padding: 3,
      borderRadius: '16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      backgroundColor: theme.palette.background.paper,
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      height: 'Auto', // Let the content define the height
    }}>
      <Box sx={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Box>
          <Typography variant="h5" sx={{fontSize:'1.5rem'}}>
            Performa Keuangan
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, mb: 2, fontSize:'1rem' }}>
            Ikhtisar Performa Keuangan Perusahaan
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

      <ResponsiveContainer width="100%" height={300}>
        <RadarChart outerRadius={90} data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 150]} />
          <Radar name="Pendapatan" dataKey="Pendapatan" stroke={theme.palette.primary.main} fill={theme.palette.primary.main} fillOpacity={0.6} />
          <Radar name="Tunggakan" dataKey="Tunggakan" stroke={theme.palette.secondary.main} fill={theme.palette.secondary.main} fillOpacity={0.6} />
          <Radar name="Prabayar" dataKey="Prabayar" stroke={theme.palette.error.main} fill={theme.palette.error.main} fillOpacity={0.6} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default RadarCard;