import { Box, Button, IconButton, Typography, useTheme, Select, MenuItem, InputLabel, FormControl, Tabs, Tab } from "@mui/material";
import { tokens} from "../../../theme";
import React, {useState, useEffect} from "react";
import InfoBox from "../../../components/InfoBox"
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NewBarChart from '../../../components/NewBarChart'
import NewPieChart from '../../../components/NewPieChart'
import {mockDataCombined} from '../../../data/mockData'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosNew';
import NewDataTable from '../../../components/NewDataTable';
import NewLineChart from '../../../components/NewLineChart';
import NewHighlightBox from "../../../components/NewHighlight";
// import DashboardFilter from '../../../components/DashboardFilter'

const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

const calculatePercentages = (data) => {
  let lastRealisasiByYear = {}; 
  let sortedData = [...data].sort((a, b) => a.Tahun - b.Tahun || months.indexOf(a.Bulan) - months.indexOf(b.Bulan)); 
  
  return sortedData.map((item, index, array) => {
    const achievement = Math.min(110, (item.Realisasi / item.Target) * 100);

    let increase = 0;
    if (index > 0) {
      // Find previous month's data
      let prevItem = array[index - 1];
      if (item.Bulan === 'Januari') {
        // For January, find last year's December
        prevItem = array.find(d => d.Bulan === 'Desember' && d.Tahun === item.Tahun - 1);
      }
      
      if (prevItem) {
        const lastYearRealisasi = prevItem.Realisasi;
        increase = lastYearRealisasi === 0 ? 0 : ((item.Realisasi - lastYearRealisasi) / lastYearRealisasi) * 100;
      }
    }

    // Update lastRealisasi for the year and month
    lastRealisasiByYear[item.Tahun] = item.Realisasi;

    return {
      ...item,
      Pencapaian: parseFloat(achievement.toFixed(2)),
      Kenaikan: parseFloat(increase.toFixed(2)),
    };
  });
};

const TabContentOne = ({ unitFilter, yearFilter, selectedSection }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [dataMode, setDataMode] = useState('Pendapatan');
  const [salesData, setSalesData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [activeChartIndex, setActiveChartIndex] = useState(0);
  const chartTitles = ['Barchart Pendapatan', 'Linechart Penjualan'];
  const currentTitle = chartTitles[activeChartIndex];

  const filteredData = mockDataCombined.filter(data => 
    (data.Bagian === 'Penjualan' || data.Bagian === 'Pendapatan') &&
    (!unitFilter || data.Unit === unitFilter) &&
    (!yearFilter || data.Tahun === yearFilter)
);

  const getProcessedData = (section) => {
    const filteredData = mockDataCombined.filter(data =>
      data.Bagian === section &&
      (!unitFilter || data.Unit === unitFilter) && // Menggunakan unitFilter dari props
      (!yearFilter || data.Tahun === yearFilter)   // Menggunakan yearFilter dari props
    );
    return calculatePercentages(filteredData);
  };
  
  
  // Menggunakan useEffect untuk mengatur data saat komponen dimuat
  React.useEffect(() => {
    const salesData = getProcessedData('Penjualan');
    const revenueData = getProcessedData('Pendapatan');
    setSalesData(salesData);
    setRevenueData(revenueData);
  }, [unitFilter, yearFilter]);

  const processedPenjualanData = getProcessedData('Penjualan');
  const processedPendapatanData = getProcessedData('Pendapatan');

  const barchartData = filteredData.filter(item => item.Bagian == "Pendapatan");
  const filteredDataLine = mockDataCombined.filter(item => 
    item.Bagian == "Penjualan" &&
    (!unitFilter || item.Unit === unitFilter) &&
    (!yearFilter || item.Tahun === yearFilter)
  );
  

  const linechartData = [
    {
      id: 'Target',
      data: months.map(month => {
        const total = filteredDataLine
          .filter(dataItem => dataItem.Bulan === month)
          .reduce((sum, item) => sum + item.Target, 0);
        return { x: month, y: total };
      }),
    },
    {
      id: 'Realisasi',
      data: months.map(month => {
        const total = filteredDataLine
          .filter(dataItem => dataItem.Bulan === month)
          .reduce((sum, item) => sum + item.Realisasi, 0);
        return { x: month, y: total };
      }),
    },
  ];
  
  const chartData = [barchartData, linechartData];
  
  const handleChartChange = (direction) => {
    if (direction === 'next') {
        setActiveChartIndex((prevIndex) => (prevIndex + 1) % chartData.length);
    } else if (direction === 'prev') {
        setActiveChartIndex((prevIndex) => (prevIndex - 1 + chartData.length) % chartData.length);
    }
  };  

  const renderChart = () => {
    if (activeChartIndex === 0) {
        return <NewBarChart 
            data={chartData[0]}
            xAxisKey="Bulan"
            barDataKey="Realisasi"
            color="#82ca9d"
            onBarClick={(data, index) => {/* handle bar click */}}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            height={300}
            width={500}
        />;
    } else {
        return <NewLineChart 
            data={chartData[1]}
            xAxisKey="Bulan"
            lineDataKeys={['Target', 'Realisasi']}
            colors={['#8884d8', '#82ca9d']}
            onLineClick={(data, index) => {/* handle line click */}}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            height={300}
            width={500}
        />;
    }
};

  const pieChartDataPendapatan = filteredData
  .filter(item => item.Bagian === "Pendapatan")
  .map(item => ({ id: item.Bulan, value: item.Realisasi }));

  const pieChartDataPenjualan = filteredData
  .filter(item => item.Bagian === "Penjualan")
  .map(item => ({ id: item.Bulan, value: item.Realisasi }));

  const toggleDataMode = () => {
    setDataMode(prevMode => prevMode === 'Pendapatan' ? 'Penjualan' : 'Pendapatan');
  };

  const title = dataMode === 'Pendapatan' ? 'Piechart Pendapatan (Milyar)' : 'Piechart Penjualan (GWh)';
  const data = dataMode === 'Pendapatan' ? pieChartDataPendapatan : pieChartDataPenjualan;

  const bestAchievementData = {
    value: 340,
    percentage: '+15%',
    label: 'Pencapaian Terbaik'
  };

  const worstAchievementData = {
    value: 340,
    percentage: '-15%',
    label: 'Pencapaian Terendah'
  };

    return (
        <>
        {/* ROW 1*/}
        <Box gridColumn="span 3" gridRow="span 1">
          <NewHighlightBox
            type="bestAchievement"
            percentage="+20%"
            value={500}
            target="Dari Target"
          />
        </Box>
        <Box gridColumn="span 3" gridRow="span 1">
          <NewHighlightBox
            type="bestAchievement"
            percentage="+20%"
            value={500}
            target="Dari Target"
          />
        </Box>
        <Box gridColumn="span 3" gridRow="span 1">
          <NewHighlightBox
            type="gapAnalysis"
            interval={60000} // Ganti interval menjadi 60 detik
          />
        </Box>
        <Box gridColumn="span 3" gridRow="span 1">
        <NewHighlightBox
            type="gapAnalysis"
            interval={60000} // Ganti interval menjadi 60 detik
        />
        </Box>

        {/* ROW 2*/}
        <Box gridColumn="span 8" gridRow="span 2" backgroundColor={colors.primary[400]} p="30px">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography
                variant="h5"
                fontWeight="600"
                sx={{ marginBottom: "15px" }}
              >
                {currentTitle}
              </Typography>
              <Box>
                <IconButton onClick={() => handleChartChange('prev')}>
                  <ArrowBackIosIcon />
                </IconButton>
                <IconButton onClick={() => handleChartChange('next')}>
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>
          </Box>
          {renderChart()}
        </Box>
        
        <Box 
          gridColumn="span 4" 
          gridRow="span 2" 
          backgroundColor={colors.primary[400]} 
          p="30px"
          onClick={toggleDataMode} // Menangani klik pada Box
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            {title}
          </Typography>
          <NewPieChart data={data} />
        </Box>

        {/* ROW 3*/}
        <Box gridColumn="span 6" gridRow="span 3" backgroundColor={colors.primary[400]} p="30px">
          <Typography variant="h5" fontWeight="600" sx={{ marginBottom: "15px" }}>
            Table Penjualan
          </Typography>
          <Box sx={{ overflow: 'auto', height: 'calc(100% - 10px)' }}>
            <NewDataTable data={processedPenjualanData} showToolbar={false} isDetailedPage={false}/>
          </Box>
        </Box>

        <Box gridColumn="span 6" gridRow="span 3" backgroundColor={colors.primary[400]} p="30px">
          <Typography variant="h5" fontWeight="600" sx={{ marginBottom: "15px" }}>
            Table Pendapatan
          </Typography>
          {/* Tambahkan NewDataTable di sini dengan data yang sudah difilter untuk pendapatan */}
          <Box sx={{ overflow: 'auto', height: 'calc(100% - 10px)' }}>
            <NewDataTable data={processedPendapatanData} showToolbar={false} isDetailedPage={false}/>
          </Box>
        </Box>
        </>
    );

}

export default TabContentOne;
