// import React, { useState } from 'react';
// import { Box, Button, ButtonGroup, Grid, useTheme } from "@mui/material";
// import Header from "../../components/Header";
// import BarChart from "../../components/BarChart";
// import DataTable from '../../components/DataTables';
// import { mockBarData } from '../../data/mockData';

// const columns = [
//   { field: 'id', headerName: 'ID', flex: 0.5 },
//   { field: 'country', headerName: 'Country', flex: 1 },
//   { field: 'hotDog', headerName: 'Hot Dog', type: 'number', flex: 1 },
//   { field: 'burger', headerName: 'Burger', type: 'number', flex: 1 },
//   { field: 'kebab', headerName: 'Kebab', type: 'number', flex: 1 },
//   { field: 'donut', headerName: 'Donut', type: 'number', flex: 1 },
// ];

// // This function will be used to transform your bar chart data into a format suitable for the DataGrid
// const transformBarDataToGridData = (barData) => {
//   return barData.map((item, index) => ({
//     id: index + 1,
//     country: item.country,
//     hotDog: item['hot dog'],
//     burger: item.burger,
//     kebab: item.kebab,
//     donut: item.donut,
//   }));
// };

// const Bar = () => {
//   const theme = useTheme();
//   const [viewType, setViewType] = useState('Graph'); // 'Graph' atau 'Table'

//   const transformedData = transformBarDataToGridData(mockBarData);

//   // Gaya untuk tombol yang aktif dan tidak aktif
//   const activeButtonStyle = {
//     color: theme.palette.common.white,
//     backgroundColor: theme.palette.primary.main,
//     '&:hover': {
//       backgroundColor: theme.palette.primary.dark,
//     },
//   };

//   const inactiveButtonStyle = {
//     color: theme.palette.grey[500],
//     backgroundColor: theme.palette.background.paper,
//     '&:hover': {
//       backgroundColor: theme.palette.background.default,
//     },
//   };

//   const keys = ["hot dog", "burger", "sandwich", "kebab", "fries", "donut"];
//   const indexBy = "country";

//   return (
//     <Box m="20px">
//       <Header title="Bar Chart" subtitle="Simple Bar Chart" />
//       <Grid container justifyContent="center" sx={{ margin: '20px 0' }}>
//         <ButtonGroup variant="contained">
//           <Button 
//             onClick={() => setViewType('Graph')}
//             sx={viewType === 'Graph' ? activeButtonStyle : inactiveButtonStyle}
//           >
//             Graph
//           </Button>
//           <Button 
//             onClick={() => setViewType('Table')}
//             sx={viewType === 'Table' ? activeButtonStyle : inactiveButtonStyle}
//           >
//             Data
//           </Button>
//         </ButtonGroup>
//       </Grid>
//       <Box height="75vh">
//         {viewType === 'Graph' ? (
//           <BarChart data={mockBarData} keys={keys} indexBy={indexBy} />
//           ) : (
//             <DataTable data={transformedData} columns={columns} />
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default Bar;
