import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton, useTheme } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { tokens } from "../../../theme";
import NewLineChart from '../../../components/NewLineChart';
import NewPieChart from '../../../components/NewPieChart';
import NewDataTable from '../../../components/NewDataTable';
import { mockDataCombined } from '../../../data/mockData';

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

const TabContentFour = ({ unitFilter, yearFilter }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [lineChartData, setLineChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [tableDataRetur, setTableDataRetur] = useState([]);

  const [currentDataType, setCurrentDataType] = useState('Retur');
  const dataTypes = ['Retur', 'Saldo Tunggakan', 'Piutang Prabayar'];

  useEffect(() => {
    // Filter the data based on the selected unit and year
    const filteredData = mockDataCombined.filter(item =>
      (!unitFilter || item.Unit === unitFilter) &&
      (!yearFilter || item.Tahun === yearFilter)
    );

    // Process the data for the line chart
    const lineChartReturData = filteredData
      .filter(item => item.Bagian === 'Retur')
      .map(item => ({ x: item.Bulan, y: item.Realisasi || 0 }));
    const lineChartSaldoTunggakanData = filteredData
      .filter(item => item.Bagian === 'Saldo Tunggakan')
      .map(item => ({ x: item.Bulan, y: item.Realisasi || 0 }));

    setLineChartData([
      { id: 'Retur', data: lineChartReturData },
      { id: 'Saldo Tunggakan', data: lineChartSaldoTunggakanData }
    ]);

    // Process the data for the pie chart
    const pieChartPiutangPrabayarData = filteredData
      .filter(item => item.Bagian === 'Piutang Prabayar')
      .map(item => ({ id: item.Bulan, value: item.Realisasi || 0 }));

    setPieChartData(pieChartPiutangPrabayarData);

    // Process the data for the table
    const tableReturData = calculatePercentages(
      filteredData.filter(item => item.Bagian === 'Retur')
    );

    updateTableData(currentDataType);
  }, [unitFilter, yearFilter]);

  const updateTableData = (dataType) => {
    const tableData = calculatePercentages(
      mockDataCombined.filter(item =>
        item.Bagian === dataType &&
        (!unitFilter || item.Unit === unitFilter) &&
        (!yearFilter || item.Tahun === yearFilter)
      )
    );
    setTableDataRetur(tableData);
  };

  const handleChangeDataType = (direction) => {
    setCurrentDataType(prevType => {
      const currentIndex = dataTypes.indexOf(prevType);
      const nextIndex = direction === 'next'
        ? (currentIndex + 1) % dataTypes.length
        : (currentIndex - 1 + dataTypes.length) % dataTypes.length;
      
      // Update table data here after changing the type
      const newDataType = dataTypes[nextIndex];
      updateTableData(newDataType); // Call function to update table data

      return newDataType;
    });
  };

    return (
        <>
            {/* Row 1 */}
          <Box gridColumn="span 2" gridRow="span 1" backgroundColor={colors.primary[400]} p="30px">
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ marginBottom: "15px" }}
              >
                Highlight 1
            </Typography>
          </Box>

          <Box gridColumn="span 2" gridRow="span 1" backgroundColor={colors.primary[400]} p="30px">
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ marginBottom: "15px" }}
              >
                Highlight 2
            </Typography>
          </Box>

          <Box gridColumn="span 8" gridRow="span 2" backgroundColor={colors.primary[400]} p="30px">
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ marginBottom: "15px" }}
              >
                Linechart Retur dan Saldo Tunggakan
            </Typography>
            <NewLineChart data={lineChartData} />
          </Box>


          {/* Row 2 */}

          <Box gridColumn="span 2" gridRow="span 1" backgroundColor={colors.primary[400]} p="30px">
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ marginBottom: "15px" }}
              >
                Highlight 3
            </Typography>
          </Box>

          <Box gridColumn="span 2" gridRow="span 1" backgroundColor={colors.primary[400]} p="30px">
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ marginBottom: "15px" }}
              >
                Highlight 4
            </Typography>
          </Box>

          {/* Row 3 */}
          <Box gridColumn="span 8" gridRow="span 3" backgroundColor={colors.primary[400]} p="30px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Table {currentDataType}
          </Typography>
          <Box>
            <IconButton onClick={() => handleChangeDataType('prev')}>
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton onClick={() => handleChangeDataType('next')}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </Box>
        <NewDataTable data={tableDataRetur} showToolbar={false} isDetailedPage={false} />
      </Box>

          <Box gridColumn="span 4" gridRow="span 3" backgroundColor={colors.primary[400]} p="30px">
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ marginBottom: "15px" }}
              >
                Piechart Piutang Prabayar
            </Typography>
            <NewPieChart data={pieChartData} />
          </Box>

        </>
    );
}

export default TabContentFour;
