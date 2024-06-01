import { Paper, Box, Button, IconButton, Typography, useTheme, Select, MenuItem, InputLabel, FormControl, Tabs, Tab } from "@mui/material";
import { tokens } from "../../theme";
import { TabLink, TabContent } from 'react-tabs-redux';
import { connect } from 'react-redux';
import Header from "../../components/Header";
import React, {useState, useEffect} from "react";
import FileUploadIcon from '@mui/icons-material/FileUpload'; // Make sure to import the icons
import GetAppIcon from '@mui/icons-material/GetApp'; // Make sure to import the icons
import TabContentOne from './tabs/TabContentOne'
import TabContentTwo from './tabs/TabContentTwo'
import TabContentThree from './tabs/TabContentThree'
import TabContentFour from './tabs/TabContentFour'
import { mockDataCombined } from "../../data/mockData";

const styles = {
  tabs: {
    display: 'flex',
    justifyContent: 'center',
    borderBottom: '1px solid #ccc',
  },
  tabLink: {
    padding: '10px',
    cursor: 'pointer',
    borderBottom: '2px solid transparent',
  },
  activeLinkStyle: {
    borderBottom: '2px solid #000',
  },
  content: {
    padding: '20px',
    border: '1px solid #ccc',
    borderTop: 'none',
  },
};

const Dashboard = ({activeTab}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentTab, setCurrentTab] = useState(0);
  const [unitFilterValue, setUnitFilterValue] = useState('');
  const [yearFilterValue, setYearFilterValue] = useState('');
  const [unitOptions, setUnitOptions] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);

  const pageNames = [ 
    "Performa Penjualan dan Pendapatan", 
    "Kualitas Layanan dan Respons Pelanggan", 
    "Manajemen Pelanggan dan Konektivitas", 
    "Manajemen Piutang dan Keuangan"
  ];

  const [filterValue, setFilterValue] = React.useState('');
  const [tabIndex, setTabIndex] = useState(0);

  const handleUnitFilterChange = (event) => {
    setUnitFilterValue(event.target.value);
  };

  const handleYearFilterChange = (event) => {
    setYearFilterValue(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);  
  };

  // Render the content for the current tab
  const renderCurrentTabContent = () => {
    switch (tabIndex) {
      case 0:
        return <TabContentOne unitFilter={unitFilterValue} yearFilter={yearFilterValue}/>;
      case 1:
        return <TabContentTwo unitFilter={unitFilterValue} yearFilter={yearFilterValue}/>;
      case 2:
        return <TabContentThree unitFilter={unitFilterValue} yearFilter={yearFilterValue}/>;
      case 3:
        return <TabContentFour unitFilter={unitFilterValue} yearFilter={yearFilterValue}/>;
      default:
        return <Typography>Content not available.</Typography>;
    }
  };

  useEffect(() => {
    const units = new Set(mockDataCombined.map(item => item.Unit));
    const years = new Set(mockDataCombined.map(item => item.Tahun));

    setUnitOptions([...units]);
    setYearOptions([...years]);
  }, []);

  return (
    <Box m="20px">
      
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        {/* FILTER & UPLOAD/DOWNLOAD BUTTONS */}
        <Box display="flex" gap="8px">
          {/* Small Upload Excel Button */}
          <Button
            variant="contained"
            component="label"
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              '&:hover': {
                backgroundColor: colors.blueAccent[800],
              },
              padding: '10px',
              // minWidth: 'auto', // Remove this to allow square shape
            }}
          >
            <FileUploadIcon />
            <input type="file" hidden accept=".xlsx, .xls" />
          </Button>

          {/* Small Download Reports Button */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              '&:hover': {
                backgroundColor: colors.blueAccent[800],
              },
              padding: '10px',
              // minWidth: 'auto', // Remove this to allow square shape
            }}
          >
            <GetAppIcon />
          </Button>

          {/* Large Filter Button */}
            {/* Filter for Unit */}
              <FormControl sx={{ width: 100 }}>
                <InputLabel id="unit-select-label">Unit</InputLabel>
                <Select
                  labelId="unit-select-label"
                  id="unit-select"
                  value={unitFilterValue}
                  label="Unit"
                  onChange={handleUnitFilterChange}
                >
                  {unitOptions.map((unit, index) => (
                    <MenuItem key={index} value={unit}>{unit}</MenuItem>
                  ))}
                </Select>
              </FormControl>

            {/* Filter for Year */}
              <FormControl sx={{ width: 100 }}>
                <InputLabel id="year-select-label">Tahun</InputLabel>
                <Select
                  labelId="year-select-label"
                  id="year-select"
                  value={yearFilterValue}
                  label="Tahun"
                  onChange={handleYearFilterChange}
                >
                  {yearOptions.map((year, index) => (
                    <MenuItem key={index} value={year}>{year}</MenuItem>
                  ))}
                </Select>
              </FormControl>
        </Box>
      </Box>

      {/* Navigation Tab */}
      <Tabs value={tabIndex} onChange={handleTabChange} aria-label="dashboard tabs">
        {pageNames.map((name, index) => (
          <Tab key={index} label={name} />
        ))}
      </Tabs>


      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="16px"
      >
        {renderCurrentTabContent()}

      </Box>
    </Box>

    

  );
};

export default Dashboard;
