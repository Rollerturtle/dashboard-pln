// ChartWrapper.jsx
import React from 'react';
import NewBarChart from "../NewBarChart";
import NewLineChart from "../NewLineChart";
import NewAreaChart from "../NewAreaChart";
import NewPieChart from '../NewPieChart';
import NewDataTable from '../NewDataTable';

const ChartWrapper = ({
  chartType,
  dataForBarChart,
  dataForLineChart,
  dataForAreaChart,
  dataForPieChart,
  processedData
}) => {
  switch (chartType) {
    case 'Bar':
      return <NewBarChart data={dataForBarChart} />;
      console.log("Rendering Bar Chart with data:", dataForBarChart);
    case 'Line':
      return <NewLineChart data={dataForLineChart} />;
    case 'Area':
        return <NewAreaChart data={[dataForAreaChart.Target, dataForAreaChart.Realisasi]} />;
    case 'Pie':
      return <NewPieChart data={dataForPieChart} />;
    case 'Table':
      return <NewDataTable data={processedData} />;
    default:
      return null;
  }
};

export default ChartWrapper;
