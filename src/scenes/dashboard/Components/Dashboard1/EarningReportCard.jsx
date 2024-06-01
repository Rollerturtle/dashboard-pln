import React, { useState, useMemo } from 'react';
import { Paper, Typography, Box, Button, IconButton, Menu, MenuItem, FormControl, InputLabel, Select, styled, useTheme } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import PaymentIcon from '@mui/icons-material/Payment';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import FilterListIcon from '@mui/icons-material/FilterList';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { NewMockData } from '../../../../data/NewMockData';

const renderCustomBarLabel = (tabKey) => ({ x, y, width, height, value }) => {
  let unit;
  switch (tabKey) {
    case 'Penjualan':
    case 'Pendapatan':
      unit = 'M';
      break;
    case 'Tunggakan':
    case 'Prabayar':
    case 'Retur':
      unit = '%';
      break;
    default:
      unit = '';
  }
  return (
    <text x={x + width / 2} y={y} fill="#555" textAnchor="middle" dy={-6}>
      {`${value.toFixed(2)} ${unit}`}
    </text>
  );
};

const TabButton = styled(Button)(({ theme, selected }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(1.5),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: selected ? theme.palette.primary.light : 'transparent',
  color: selected ? theme.palette.primary.contrastText : theme.palette.text.primary,
  boxShadow: 'none',
  textTransform: 'none',
  flexGrow: 1,
  maxWidth: '100px',
  '& .MuiButton-startIcon': {
    marginRight: 0,
    marginBottom: theme.spacing(1),
  },
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
}));

const EarningsReportCard = () => {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');

  // Memoized values for units and years
  const units = useMemo(() => ['All', ...new Set(NewMockData.map(item => item.Unit))], []);
  const years = useMemo(() => ['All', ...new Set(NewMockData.map(item => item.Tahun.toString()))], []);

  const tabsDataKey = ['Penjualan', 'Pendapatan', 'Retur', 'Tunggakan', 'Prabayar'];
  const tabLabels = {
    Penjualan: 'Penjualan',
    Pendapatan: 'Pendapatan',
    Retur: 'Pengendalian Piutang Saldo Retur',
    Tunggakan: 'Pengendalian Piutang Saldo Tunggakan',
    Prabayar: 'Penurunan Saldo Piutang Prabayar'
  };
  const icons = [
    <FlashOnIcon key="Penjualan" />,
    <MonetizationOnIcon key="Pendapatan" />,
    <AutorenewIcon key="Retur" />,
    <AssignmentLateIcon key="Tunggakan" />,
    <PaymentIcon key="Prabayar" />,
  ];

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleUnitChange = (event) => setSelectedUnit(event.target.value);
  const handleYearChange = (event) => setSelectedYear(event.target.value);
  const handleReset = () => {
    setSelectedUnit('All');
    setSelectedYear('All');
  };
  const handleTabChange = (event, newValue) => setTabValue(newValue);

  const filteredData = useMemo(() => {
    const months = Array.from({ length: 12 }, (_, i) => new Date(2000, i).toLocaleString('id-ID', { month: 'long' }));
    return months.map(month => {
      const totalRealisasi = NewMockData.reduce((acc, item) => {
        if (item.Bagian === tabLabels[tabsDataKey[tabValue]] &&
            (selectedYear === 'All' || item.Tahun.toString() === selectedYear) &&
            (selectedUnit === 'All' || item.Unit === selectedUnit) &&
            item.Bulan === month) {
          return acc + item.Realisasi;
        }
        return acc;
      }, 0);
      const totalTarget = NewMockData.reduce((acc, item) => {
        if (item.Bagian === tabLabels[tabsDataKey[tabValue]] &&
            (selectedYear === 'All' || item.Tahun.toString() === selectedYear) &&
            (selectedUnit === 'All' || item.Unit === selectedUnit) &&
            item.Bulan === month) {
          return acc + item.Target;
        }
        return acc;
      }, 0);
      return { month, Realisasi: totalRealisasi, Target: totalTarget };
    });
  }, [tabValue, selectedYear, selectedUnit, NewMockData]);

  const maxValue = Math.max(...filteredData.map(item => item.Realisasi));

  
  return (
    <Paper sx={{
      padding: 2,
      borderRadius: '16px',
      boxShadow: 3,
      backgroundColor: theme.palette.background.paper,
    }}>
       <Box sx={{ padding: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h5" gutterBottom sx={{fontSize:'1.5rem'}}>
            Laporan Keuangan
          </Typography>
          <Typography variant="body1" gutterBottom sx={{fontSize:'1rem'}}>
            Ikhtisar Keuangan Tahunan
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
  <InputLabel>Unit</InputLabel>
  <Select value={selectedUnit} onChange={handleUnitChange}>
    <MenuItem value="All"><em>All</em></MenuItem>
    {units.map(unit => (
      <MenuItem key={unit} value={unit}>{unit}</MenuItem>
    ))}
  </Select>
</FormControl>
<FormControl fullWidth margin="normal">
  <InputLabel>Year</InputLabel>
  <Select value={selectedYear} onChange={handleYearChange}>
    <MenuItem value="All"><em>All</em></MenuItem>
    {years.map(year => (
      <MenuItem key={year} value={year}>{year}</MenuItem>
    ))}
  </Select>
</FormControl>
            <Button onClick={handleReset} fullWidth variant="contained" sx={{ mt: 2, backgroundColor: 'red', color: 'white' }}>
              Reset
            </Button>
          </Box>
        </Menu>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', gap: 1 }}>
        {tabsDataKey.map((key, index) => (
          <TabButton
            key={key}
            variant="outlined"
            selected={tabValue === index}
            onClick={() => handleTabChange(null, index)}
            startIcon={React.cloneElement(icons[index], { style: { fontSize: 'large' }})}
          >
            <Typography variant="button" style={{ fontSize: '1rem' }}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Typography>
          </TabButton>
        ))}
      </Box>
      <ResponsiveContainer width="100%" height={300}>
  <BarChart
    data={filteredData}
    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
  >
    <XAxis dataKey="month" />
    <Tooltip formatter={(value) => value.toFixed(2)} />
    <Bar dataKey="Realisasi" fill="#8884d8" label={renderCustomBarLabel(tabsDataKey[tabValue])}>
      {filteredData.map((entry, index) => {
        const isPositiveBar = tabValue === 0 || tabValue === 1;
        const fillColor = isPositiveBar
          ? (entry.Realisasi >= entry.Target ? '#4CAF50' : '#F44336')
          : (entry.Realisasi > entry.Target ? '#F44336' : '#4CAF50');

        return (
          <Cell 
            key={`cell-${index}`} 
            fill={fillColor}
            radius={[10, 10, 0, 0]} // Rounded corners at the top
          />
        );
      })}
    </Bar>
  </BarChart>
</ResponsiveContainer>
    </Paper>
  );
};

export default EarningsReportCard;
