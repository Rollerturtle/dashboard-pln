import { Box, Button, IconButton, Typography, useTheme, Select, MenuItem, InputLabel, FormControl, Tabs, Tab } from "@mui/material";
import { tokens } from "../../../theme";
import { mockTransactions } from "../../../data/mockData";
import React, {useEffect, useState} from "react";
import NewAreaChart from "../../../components/NewAreaChart"
import { mockDataCombined } from "../../../data/mockData";
import NewDataTable from "../../../components/NewDataTable";


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

const TabContentThree = ({ unitFilter, yearFilter }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


//   const householdCustomerData = mockDataCombined.filter(item => item.Bagian === "Pelanggan Rumah Tangga");

//   const targetData = {
//     id: "Target",
//     data: householdCustomerData.map(item => ({
//       x: item.Bulan,
//       y: item.Target // Angka target rumah
//     }))
//   };
  
//   const realizationData = {
//     id: "Realisasi",
//     data: householdCustomerData.map(item => ({
//       x: item.Bulan,
//       y: item.Realisasi // Angka realisasi rumah
//     }))
//   };

//   const getProcessedData = (section) => {
//     const filteredData = mockDataCombined.filter(data =>
//       data.Bagian === section &&
//       (data.Unit === "All") && // Menggunakan unitFilter dari props
//       (data.Tahun === "All")   // Menggunakan yearFilter dari props
//     );
//     return calculatePercentages(filteredData);
//   };

//   const processedPelangganData = getProcessedData('Pelanggan Rumah Tangga');

//   const areaChartData = [targetData, realizationData];

//   const filteredData = mockDataCombined.filter(data => 
//     (data.Bagian === 'Pelanggan Rumah Tangga') &&
//     (data.Unit === "All") &&
//     (data.Tahun === "All")
// );

//   const processedPenjualanData = getProcessedData('Pelanggan Rumah Tangga');

 // State untuk data area chart dan datatable
 const [areaChartData, setAreaChartData] = useState([]);
 const [tableData, setTableData] = useState([]);

 useEffect(() => {
   // Filter data berdasarkan "Pelanggan Rumah Tangga", unit, dan tahun
   const filteredData = mockDataCombined.filter(item =>
     item.Bagian === "Pelanggan Rumah Tangga" &&
     (!unitFilter || item.Unit === unitFilter) &&
     (!yearFilter || item.Tahun === yearFilter)
   );

   // Transformasi data untuk area chart
   const targetData = {
     id: "Target",
     data: filteredData.map(item => ({ x: item.Bulan, y: item.Target }))
   };

   const realizationData = {
     id: "Realisasi",
     data: filteredData.map(item => ({ x: item.Bulan, y: item.Realisasi }))
   };

   setAreaChartData([targetData, realizationData]);

   // Data untuk table (misalnya menggunakan fungsi calculatePercentages atau langsung dari filteredData)
   // Asumsi fungsi calculatePercentages mengembalikan data dalam format yang dibutuhkan oleh NewDataTable
   const processedData = calculatePercentages(filteredData);
   setTableData(processedData);
 }, [unitFilter, yearFilter]);


    return (
        <>
             {/* Row 1 */}
             <Box gridColumn="span 4" gridRow="span 1" backgroundColor={colors.primary[400]} p="30px">
                <Typography
                    variant="h5"
                    fontWeight="600"
                    sx={{ marginBottom: "15px" }}
                  >
                    Total Pelanggan Baru
                  </Typography>
              </Box>
              <Box gridColumn="span 4" gridRow="span 1" backgroundColor={colors.primary[400]} p="30px">
                <Typography
                    variant="h5"
                    fontWeight="600"
                    sx={{ marginBottom: "15px" }}
                  >
                    Persentase Target Terpenuhi
                  </Typography>
              </Box>
              <Box gridColumn="span 4" gridRow="span 1" backgroundColor={colors.primary[400]} p="30px">
                <Typography
                    variant="h5"
                    fontWeight="600"
                    sx={{ marginBottom: "15px" }}
                  >
                    Pertumbuhan Pelanggan Baru tahunan
                  </Typography>
              </Box>

          {/* Row 2 */}
          <Box gridColumn="span 12" gridRow="span 2" backgroundColor={colors.primary[400]} p="30px">
                <Typography
                    variant="h5"
                    fontWeight="600"
                    sx={{ marginBottom: "15px" }}
                  >
                    Areachart Penyambungan Pelanggan Rumah Tangga
                  </Typography>
                  <NewAreaChart data={areaChartData} isDashboard={true}/>
              </Box>
          
          {/* Row 3 */}
          <Box gridColumn="span 8" gridRow="span 2" backgroundColor={colors.primary[400]} p="30px">
              <Typography variant="h5" fontWeight="600" sx={{ marginBottom: "15px" }}>
                Table Penjualan
              </Typography>
              <Box sx={{ overflow: 'auto', height: 'calc(100% - 10px)' }}>
                <NewDataTable data={tableData} showToolbar={false} isDetailedPage={false}/>
              </Box>
            </Box>
          
              <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              overflow="auto"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                colors={colors.grey[100]}
                p="15px"
              >
                <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                  Saldo Tunggakan
                </Typography>
              </Box>
              {mockTransactions.map((transaction, i) => (
                <Box
                  key={`${transaction.txId}-${i}`}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  p="15px"
                >
                  <Box>
                    <Typography
                      color={colors.greenAccent[500]}
                      variant="h5"
                      fontWeight="600"
                    >
                      {transaction.txId}
                    </Typography>
                    <Typography color={colors.grey[100]}>
                      {transaction.user}
                    </Typography>
                  </Box>
                  <Box color={colors.grey[100]}>{transaction.date}</Box>
                  <Box
                    backgroundColor={colors.greenAccent[500]}
                    p="5px 10px"
                    borderRadius="4px"
                  >
                    ${transaction.cost}
                  </Box>
                </Box>
              ))}
            </Box>
        </>
    );
}

export default TabContentThree;
