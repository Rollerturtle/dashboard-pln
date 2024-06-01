import React, { useMemo, useState } from 'react';
import { Button, Paper, Typography, Box, Avatar, useTheme, IconButton, Menu, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import FilterListIcon from '@mui/icons-material/FilterList';
import PercentIcon from '@mui/icons-material/Percent';
import PaymentsIcon from '@mui/icons-material/Payments';
import PaymentIcon from '@mui/icons-material/Payment';
import { NewMockData } from '../../../../data/NewMockData';

const data = [
  // Data untuk grafik
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Jun', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Jul', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Aug', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Sep', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Oct', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Nov', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Dec', uv: 2780, pv: 3908, amt: 2000 },
  // ...data lainnya
];

const ProjectStatusCard = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedUnit, setSelectedUnit] = useState('All');
  const [hoveredData, setHoveredData] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleUnitChange = (event) => setSelectedUnit(event.target.value);
  const handleYearChange = (event) => setSelectedYear(event.target.value);
  const handleReset = () => {
    setSelectedUnit('All');
    setSelectedYear('All');
  };

  const months = useMemo(() => ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'], []);
  const units = useMemo(() => ['All', ...new Set(NewMockData.map(data => data.Unit))], []);
  const years = useMemo(() => ['All', ...new Set(NewMockData.map(data => data.Tahun.toString()))], []);

  const filteredData = useMemo(() => {
    let dataByMonth = months.map(month => ({
      name: month,
      Pendapatan: 0,
      PiutangTunggakan: 0,
      PiutangPrabayar: 0,
      PiutangRetur: 0,
      TargetPendapatan: 0,
      TargetPiutangTunggakan: 0,
      TargetPiutangPrabayar: 0,
      TargetPiutangRetur: 0,
    }));

    NewMockData.forEach(item => {
      const monthIndex = months.indexOf(item.Bulan);
      if (monthIndex !== -1) {
        if (selectedYear === 'All' || item.Tahun.toString() === selectedYear) {
          if (selectedUnit === 'All' || item.Unit === selectedUnit) {
            if (item.Bagian === 'Pendapatan') {
              dataByMonth[monthIndex].Pendapatan += item.Realisasi;
              dataByMonth[monthIndex].TargetPendapatan += item.Target;
            } else if (item.Bagian === 'Pengendalian Piutang Saldo Tunggakan') {
              dataByMonth[monthIndex].PiutangTunggakan += item.Realisasi;
              dataByMonth[monthIndex].TargetPiutangTunggakan += item.Target;
            } else if (item.Bagian === 'Penurunan Saldo Piutang Prabayar') {
              dataByMonth[monthIndex].PiutangPrabayar += item.Realisasi;
              dataByMonth[monthIndex].TargetPiutangPrabayar += item.Target;
            } else if (item.Bagian === 'Pengendalian Piutang Saldo Retur') {
              dataByMonth[monthIndex].PiutangRetur += item.Realisasi;
              dataByMonth[monthIndex].TargetPiutangRetur += item.Target;
            }
          }
        }
      }
    });

    dataByMonth.forEach(month => {
      month.Piutang = month.PiutangTunggakan + month.PiutangPrabayar + month.PiutangRetur;
      month.TargetPiutang = month.TargetPiutangTunggakan + month.TargetPiutangPrabayar + month.TargetPiutangRetur;
    });

    return dataByMonth;
  }, [selectedYear, selectedUnit, months]);

  const latestYear = useMemo(() => {
    const latestYearValue = Math.max(...NewMockData.map(item => item.Tahun));
    return NewMockData.filter(item => item.Tahun === latestYearValue);
  }, []);

  const defaultData = useMemo(() => {
    let defaultPendapatan = 0;
    let defaultPiutangTunggakan = 0;
    let defaultPiutangPrabayar = 0;
    let defaultPiutangRetur = 0;
    let defaultTargetPendapatan = 0;
    let defaultTargetPiutangTunggakan = 0;
    let defaultTargetPiutangPrabayar = 0;
    let defaultTargetPiutangRetur = 0;

    latestYear.forEach(item => {
      if (item.Bagian === 'Pendapatan') {
        defaultPendapatan += item.Realisasi;
        defaultTargetPendapatan += item.Target;
      } else if (item.Bagian === 'Pengendalian Piutang Saldo Tunggakan') {
        defaultPiutangTunggakan += item.Realisasi;
        defaultTargetPiutangTunggakan += item.Target;
      } else if (item.Bagian === 'Penurunan Saldo Piutang Prabayar') {
        defaultPiutangPrabayar += item.Realisasi;
        defaultTargetPiutangPrabayar += item.Target;
      } else if (item.Bagian === 'Pengendalian Piutang Saldo Retur') {
        defaultPiutangRetur += item.Realisasi;
        defaultTargetPiutangRetur += item.Target;
      }
    });

    return {
      Pendapatan: defaultPendapatan,
      PiutangTunggakan: defaultPiutangTunggakan,
      PiutangPrabayar: defaultPiutangPrabayar,
      PiutangRetur: defaultPiutangRetur,
      TargetPendapatan: defaultTargetPendapatan,
      TargetPiutangTunggakan: defaultTargetPiutangTunggakan,
      TargetPiutangPrabayar: defaultTargetPiutangPrabayar,
      TargetPiutangRetur: defaultTargetPiutangRetur
    };
  }, [latestYear]);

  const displayData = hoveredData || defaultData;

  const renderChange = (current, target, type) => {
    const difference = (current - target).toFixed(2);
    const isPositive = difference >= 0;
    const color = type === 'Pendapatan' ? (isPositive ? 'green' : 'red') : (isPositive ? 'red' : 'green');
    
    console.log(`renderChange - Current: ${current}, Target: ${target}, Difference: ${difference}`);
    
    return (
      <Typography variant="body2" style={{ color, marginLeft: 4 }}>
        {isPositive ? '+' : ''}{difference}
      </Typography>
    );
  };

  console.log("Target Pendapatan:", displayData.TargetPendapatan);

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
            Proyeksi Keuangan
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom sx={{ mb: 4, fontSize: '1rem' }}>
            Pendapatan dan Piutang
          </Typography>
          </Box>
          <IconButton onClick={handleMenuOpen} sx={{ mt: -3 }}>
            <FilterListIcon />
          </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Box sx={{ padding: 2 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Unit</InputLabel>
              <Select value={selectedUnit} onChange={handleUnitChange}>
                {units.map(unit => (
                  <MenuItem key={unit} value={unit}>{unit}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Year</InputLabel>
              <Select value={selectedYear} onChange={handleYearChange}>
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
      <Box display="flex" justifyContent="space-between" alignItems="center" my={2} mb={5}>
        <Box display="flex" alignItems="center">
            <Avatar
            sx={{
                bgcolor: '#4CAF50',
                color: 'white',
                width: 36,
                height: 36,
                borderRadius: '6px',
                px: '5px', // padding di sisi kiri dan kanan dalam Avatar
            }}
            >
            <AttachMoneyIcon />
            </Avatar>
            <Box ml={2}> {/* Menambahkan marginLeft di sini */}
            <Typography variant="h5">Rp. {displayData.Pendapatan.toFixed(2)} M</Typography>
            <Typography variant="body2">Pendapatan</Typography>
            </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography variant="body2" style={{ color: 'green', marginLeft: 4 }}>
          {renderChange(displayData.Pendapatan, displayData.TargetPendapatan, 'Pendapatan')}
        </Typography>
        </Box>
        </Box>
        <ResponsiveContainer width="100%" height={200}>
  <AreaChart data={filteredData}
    onMouseMove={(state) => {
      if (state.isTooltipActive) {
        const activeData = state.activePayload[0].payload;
        setHoveredData({
          name: activeData.name,
                Pendapatan: activeData.Pendapatan,
                PiutangTunggakan: activeData.PiutangTunggakan,
                PiutangPrabayar: activeData.PiutangPrabayar,
                PiutangRetur: activeData.PiutangRetur,
                TargetPendapatan: activeData.TargetPendapatan,
                TargetPiutangTunggakan: activeData.TargetPiutangTunggakan,
                TargetPiutangPrabayar: activeData.TargetPiutangPrabayar,
                TargetPiutangRetur: activeData.TargetPiutangRetur
        });
      } else {
        setHoveredData(null);
      }
    }}
    onMouseLeave={() => setHoveredData(null)}
  >
    <defs>
      <linearGradient id="colorPendapatan" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="colorPiutang" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#F44336" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#F44336" stopOpacity={0} />
      </linearGradient>
    </defs>
    <XAxis dataKey="name" hide={true} />
    <Tooltip />
    <Area type="monotone" dataKey="Pendapatan" stroke="#4CAF50" fillOpacity={1} fill="url(#colorPendapatan)" />
    <Area type="monotone" dataKey="Piutang" stroke="#F44336" fillOpacity={1} fill="url(#colorPiutang)" />
  </AreaChart>
</ResponsiveContainer>
      
      <Box display="flex" justifyContent="space-between" alignItems="center" my={2} mt={2}>
        <Box display="flex" alignItems="center">
            <Avatar
            sx={{
                bgcolor: '#F44336',
                color: 'white',
                width: 36,
                height: 36,
                borderRadius: '6px',
                px: '5px', // padding di sisi kiri dan kanan dalam Avatar
            }}
            >
            <PercentIcon />
            </Avatar>
            <Box ml={2}> {/* Menambahkan marginLeft di sini */}
            <Typography variant="subtitle2">Piutang Retur</Typography>
            <Typography variant="body1">{displayData.PiutangRetur.toFixed(2)}%</Typography>
            </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography variant="body2" style={{ color: 'red' }}>
          {renderChange(displayData.PiutangRetur, displayData.TargetPiutangRetur, 'Piutang')}
        </Typography>
        </Box>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center" my={2} mt={2}>
        <Box display="flex" alignItems="center">
            <Avatar
            sx={{
                bgcolor: '#F44336',
                color: 'white',
                width: 36,
                height: 36,
                borderRadius: '6px',
                px: '5px', // padding di sisi kiri dan kanan dalam Avatar
            }}
            >
            <PaymentsIcon />
            </Avatar>
            <Box ml={2}> {/* Menambahkan marginLeft di sini */}
            <Typography variant="subtitle2">Piutang Tunggakan</Typography>
            <Typography variant="body1">Rp. {displayData.PiutangTunggakan.toFixed(2)} M</Typography>
            </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography variant="body2" style={{ color: 'red' }}>
          {renderChange(displayData.PiutangTunggakan, displayData.TargetPiutangTunggakan, 'Piutang')}
        </Typography>
        </Box>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center" my={2} mt={2}>
        <Box display="flex" alignItems="center">
            <Avatar
            sx={{
                bgcolor: '#F44336',
                color: 'white',
                width: 36,
                height: 36,
                borderRadius: '6px',
                px: '5px', // padding di sisi kiri dan kanan dalam Avatar
            }}
            >
            <PaymentIcon/>
            </Avatar>
            <Box ml={2}> {/* Menambahkan marginLeft di sini */}
            <Typography variant="subtitle2">Piutang Prabayar</Typography>
            <Typography variant="body1">Rp. {displayData.PiutangPrabayar.toFixed(2)} M</Typography>
            </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography variant="body2" style={{ color: 'red' }}>
          {renderChange(displayData.PiutangPrabayar, displayData.TargetPiutangPrabayar, 'Piutang')}
        </Typography>
        </Box>
        </Box>

    </Paper>
  );
};

export default ProjectStatusCard;
