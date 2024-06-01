import React, { useState } from 'react';
import { Paper, Box, Typography, Avatar, IconButton, Menu, MenuItem, FormControl, InputLabel, Select, Button } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilterListIcon from '@mui/icons-material/FilterList';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestoreIcon from '@mui/icons-material/Restore';
import ReactApexChart from 'react-apexcharts';
import { NewMockData } from '../../../../data/NewMockData';

const TotalEarningCard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedUnit, setSelectedUnit] = useState('All');

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleUnitChange = (event) => {
    setSelectedUnit(event.target.value);
  };

  const handleReset = () => {
    setSelectedYear('All');
    setSelectedUnit('All');
  };

  const years = [...new Set(NewMockData.map(item => item.Tahun.toString()))];
  const units = [...new Set(NewMockData.map(item => item.Unit))];

  const filteredData = NewMockData.filter(item => {
    return (selectedYear === 'All' || item.Tahun.toString() === selectedYear) &&
           (selectedUnit === 'All' || item.Unit === selectedUnit);
  });

  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

  const aggregateData = (data, bagian) => {
    return months.map(month => {
      const monthlyData = data.filter(item => item.Bagian === bagian && item.Bulan === month);
      const total = monthlyData.reduce((sum, item) => sum + item.Realisasi, 0);
      return total;
    });
  };

  const getColors = (data, bagian, colorAbove, colorBelow) => {
    return months.map(month => {
      const monthlyData = data.filter(item => item.Bagian === bagian && item.Bulan === month);
      const totalRealisasi = monthlyData.reduce((sum, item) => sum + item.Realisasi, 0);
      const totalTarget = monthlyData.reduce((sum, item) => sum + item.Target, 0);
      return totalRealisasi > totalTarget ? colorAbove : colorBelow;
    });
  };

  const responseTimeData = aggregateData(filteredData, 'Respon Time');
  const recoveryTimeData = aggregateData(filteredData, 'Recovery Time');

  const responseTimeColors = getColors(filteredData, 'Respon Time', '#FFC107', '#007BFF');
  const recoveryTimeColors = getColors(filteredData, 'Recovery Time', '#FF0000', '#00E396');

  const series = [{
    name: 'Recovery Time',
    data: recoveryTimeData.map((item, index) => ({
      x: months[index],
      y: item,
      fillColor: recoveryTimeColors[index]
    }))
  }, {
    name: 'Response Time',
    data: responseTimeData.map((item, index) => ({
      x: months[index],
      y: -item,
      fillColor: responseTimeColors[index]
    }))
  }];

  const options = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '100%',
        distributed: false,
        colors: {
          ranges: [
            {
              from: -100,
              to: 0,
              color: undefined
            },
            {
              from: 0,
              to: 100,
              color: undefined
            }
          ]
        }
      }
    },
    grid: {
      show: false
    },
    xaxis: {
      categories: months,
      labels: {
        show: true,
        style: {
          fontSize: '12px'
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: false
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (value, { seriesIndex }) => {
          if (series[seriesIndex].name === 'Response Time') {
            return `${Math.abs(value)} mins`;
          }
          return `${value} mins`;
        }
      }
    },
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    }
  };

  const calculateAverage = (data) => {
    const total = data.reduce((sum, value) => sum + value, 0);
    return data.length ? total / data.length : 0;
  };

  const calculateChange = (current, previous) => {
    if (previous === 0) return 0;
    const change = current - previous;
    return change;
  };

  const averageResponseTime = calculateAverage(responseTimeData);
  const averageRecoveryTime = calculateAverage(recoveryTimeData);

  const previousYearData = NewMockData.filter(item => {
    return (selectedYear !== 'All' && item.Tahun.toString() === (parseInt(selectedYear) - 1).toString()) &&
           (selectedUnit === 'All' || item.Unit === selectedUnit);
  });

  const previousResponseTimeData = aggregateData(previousYearData, 'Respon Time');
  const previousRecoveryTimeData = aggregateData(previousYearData, 'Recovery Time');

  const averagePreviousResponseTime = calculateAverage(previousResponseTimeData);
  const averagePreviousRecoveryTime = calculateAverage(previousRecoveryTimeData);

  const responseTimeChange = selectedYear === 'All' ? 0 : calculateChange(averageResponseTime, averagePreviousResponseTime);
  const recoveryTimeChange = selectedYear === 'All' ? 0 : calculateChange(averageRecoveryTime, averagePreviousRecoveryTime);

  const getChangeStyle = (change) => ({
    color: change === 0 ? 'text.secondary' : change >= 0 ? 'red' : 'green',
    fontSize: '1.15rem'
  });

  const getAvatarStyle = (change) => ({
    borderRadius: 2,
    bgcolor: change === 0 ? 'text.secondary' : change >= 0 ? 'red' : 'green'
  });

  return (
    <Paper elevation={3} sx={{ borderRadius: '15px', p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', }}>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Box>
            <Typography variant="h5" component="h2" sx={{ fontSize: '1.5rem', }}>RPT - RCT</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleMenuOpen}>
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
                <FormControl fullWidth margin="normal">
                  <InputLabel>Unit</InputLabel>
                  <Select value={selectedUnit} onChange={handleUnitChange}>
                    <MenuItem value="All"><em>All</em></MenuItem>
                    {units.map((unit) => (
                      <MenuItem key={unit} value={unit}>{unit}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button onClick={handleReset} fullWidth variant="contained" sx={{ backgroundColor: 'red', color: 'white' }}>
                  Reset
                </Button>
              </Box>
            </Menu>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
        <ReactApexChart options={options} series={series} type="bar" height={350} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={getAvatarStyle(recoveryTimeChange)}>
              <RestoreIcon />
            </Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body1">{averageRecoveryTime.toFixed(2)} mins</Typography>
              <Typography variant="body2">Average Recovery Time</Typography>
            </Box>
          </Box>
          <Typography variant="body1" sx={{ mt: 1.5, ...getChangeStyle(recoveryTimeChange) }}>
            {recoveryTimeChange === 0 ? `${recoveryTimeChange.toFixed(3)} mins` : recoveryTimeChange >= 0 ? `+${recoveryTimeChange.toFixed(3)} mins` : `${recoveryTimeChange.toFixed(3)} mins`}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={getAvatarStyle(responseTimeChange)}>
              <AccessTimeIcon />
            </Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body1">{averageResponseTime.toFixed(2)} mins</Typography>
              <Typography variant="body2">Average Response Time</Typography>
            </Box>
          </Box>
          <Typography variant="body1" sx={{ mt: 1.5, ...getChangeStyle(responseTimeChange) }}>
            {responseTimeChange === 0 ? `${responseTimeChange.toFixed(3)} mins` : responseTimeChange >= 0 ? `+${responseTimeChange.toFixed(3)} mins` : `${responseTimeChange.toFixed(3)} mins`}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default TotalEarningCard;
