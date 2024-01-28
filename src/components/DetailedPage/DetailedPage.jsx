// DetailedPage.jsx
import React, { useState } from 'react';
import { Box } from "@mui/material";
import Header from "../Header";
import { mockDataCombined } from "../../data/mockData"; // Import your mock data
import SwitchButton from "../SwitchButton"
import SelectionControl from "./SelectionControl"
import ChartWrapper from "./ChartWrapper"

const DetailedPage = ({ selectedSection = 'All' }) => {
  const [viewType, setViewType] = useState('Graph');
  const [selectedUnit, setSelectedUnit] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const years = ['All', ...new Set(mockDataCombined.map(data => data.Tahun))];
  const [selectedSectionState, setSelectedSectionState] = useState(selectedSection);
  const sections = [...new Set(mockDataCombined.map(data => data.Bagian))];
  const uniqueYears = Array.from(new Set(mockDataCombined.map(data => data.Tahun)));
  const uniqueSections = Array.from(new Set(mockDataCombined.map(data => data.Bagian)));
  const [chartType, setChartType] = useState('Bar'); // Default or initial state can be 'Bar' or whatever you prefer
  const sectionLocked = selectedSection !== undefined;
  const [section, setSection] = useState(selectedSection || 'All');

  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const units = ["UP3", "KOTA", "BMS", "PBG", "WGN", "WNO", "BNA"];

  const filteredData = mockDataCombined.filter(data => 
    (selectedUnit === 'All' || data.Unit === selectedUnit) &&
    (selectedYear === 'All' || data.Tahun === selectedYear) &&
    (selectedSection === 'All' || data.Bagian === selectedSection)
  );

  const dataForBarChart = months.map(month => {
    let totalTarget = 0;
    let totalRealisasi = 0;

    filteredData.forEach(dataItem => {
      if (dataItem.Bulan === month) {
        totalTarget += dataItem.Target;
        totalRealisasi += dataItem.Realisasi;
      }
    });

    return {
      Bulan: month,
      Target: totalTarget,
      Realisasi: totalRealisasi
    };
  });

  // Prepare the data for the line chart
  const targetLineData = months.map(month => {
    const monthlyData = mockDataCombined.filter(data => data.Bulan === month);
    const sumTarget = monthlyData.reduce((acc, curr) => acc + curr.Target, 0);
    return { x: month, y: sumTarget };
  });

  const realisasiLineData = months.map(month => {
    const monthlyData = mockDataCombined.filter(data => data.Bulan === month);
    const sumRealisasi = monthlyData.reduce((acc, curr) => acc + curr.Realisasi, 0);
    return { x: month, y: sumRealisasi };
  });

  const dataForLineChart = [
    {
      id: 'Target',
      data: months.map(month => {
        const total = filteredData
          .filter(dataItem => dataItem.Bulan === month)
          .reduce((sum, item) => sum + item.Target, 0);
        return { x: month, y: total };
      }),
    },
    {
      id: 'Realisasi',
      data: months.map(month => {
        const total = filteredData
          .filter(dataItem => dataItem.Bulan === month)
          .reduce((sum, item) => sum + item.Realisasi, 0);
        return { x: month, y: total };
      }),
    },
  ];
  
    const handleUnitChange = (event) => {
      setSelectedUnit(event.target.value);
    };
    
    const handleYearChange = (event) => {
      // Konversi nilai ke tipe yang sesuai sebelum filter
      const yearValue = event.target.value === 'All' ? 'All' : Number(event.target.value);
      setSelectedYear(yearValue);
    };

    const handleSectionChange = (event) => {
      setSelectedSectionState(event.target.value);
    };
    

    const calculatePercentages = (data) => {
      let lastRealisasiByYear = {}; // Last Realisasi for each year, by month
      let sortedData = [...data].sort((a, b) => a.Tahun - b.Tahun || months.indexOf(a.Bulan) - months.indexOf(b.Bulan)); // Sort data by year, then by month
      
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
    
    const processedData = calculatePercentages(filteredData);


    const dataForAreaChart = processedData.reduce((acc, item) => {
      // Ensure acc has both series initialized
      acc.Target = acc.Target || { id: 'Target', data: [] };
      acc.Realisasi = acc.Realisasi || { id: 'Realisasi', data: [] };
    
      // Push new points to each series
      acc.Target.data.push({ x: item.Bulan, y: item.Target });
      acc.Realisasi.data.push({ x: item.Bulan, y: item.Realisasi });
    
      return acc;
    }, {});
    
    const dataForPieChart = months.map(month => {
      const monthlyRealisasi = filteredData
        .filter(dataItem => dataItem.Bulan === month)
        .reduce((total, item) => total + item.Realisasi, 0);
      return { id: month, label: month, value: monthlyRealisasi };
    });

    return (
      <Box m="20px">
        <Header title="DetailedPage Charts" subtitle="Toggle between Bar and Line Charts" />
        <SelectionControl
          label="Unit"
          selected={selectedUnit}
          setSelected={setSelectedUnit}
          options={['All', ...new Set(mockDataCombined.map(data => data.Unit))]}
        />
        <SelectionControl
          label="Year"
          selected={selectedYear}
          setSelected={setSelectedYear}
          options={['All', ...new Set(mockDataCombined.map(data => data.Tahun))]}
        />
        {!sectionLocked && (
        <SelectionControl
          label="Section"
          selected={selectedSection}
          setSelected={setSection}
          options={['All', ...new Set(mockDataCombined.map(data => data.Bagian))]}
        />
      )}
        <SwitchButton
          viewType={viewType}
          setViewType={setViewType}
          chartType={chartType}
          setChartType={setChartType}
        />
        <Box height="65vh">
          <ChartWrapper
            chartType={viewType === 'Table' ? 'Table' : chartType}
            dataForBarChart={dataForBarChart}
            dataForLineChart={dataForLineChart}
            dataForAreaChart={dataForAreaChart}
            dataForPieChart={dataForPieChart}
            processedData={processedData}
          />
        </Box>
      </Box>
  );
};

export default DetailedPage;