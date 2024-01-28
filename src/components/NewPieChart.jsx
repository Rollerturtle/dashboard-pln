import React from 'react';
import { ResponsivePieCanvas } from "@nivo/pie";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../theme";

const NewPieChart = ({ data }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // Here's the custom tooltip component
    const CustomPieTooltip = ({ datum }) => {
        const theme = useTheme();
        return (
          <div
            style={{
              background: theme.palette.mode === 'dark' ? 'black' : 'white',
              padding: '9px 12px',
              border: '1px solid #ccc',
              borderRadius: '2px',
              color: theme.palette.mode === 'dark' ? 'white' : 'black',
            }}
          >
            <strong>Realisasi - {datum.id}</strong>: {datum.value}
          </div>
        );
      };      

    return (
      <ResponsivePieCanvas
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      colors={{ scheme: 'nivo' }}
      borderColor={{ from: 'color', modifiers: [['darker', 0.6]] }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={theme.palette.mode === 'dark' ? 'white' : '#333333'}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      tooltip={CustomPieTooltip}
      isInteractive={true}
      theme={{
          axis: {
              domain: {
                  line: {
                      stroke: colors.grey[100],
                  },
              },
              legend: {
                  text: {
                      fill: theme.palette.mode === 'dark' ? 'white' : colors.grey[100],
                  },
              },
              ticks: {
                  line: {
                      stroke: colors.grey[100],
                      strokeWidth: 1,
                  },
                  text: {
                      fill: theme.palette.mode === 'dark' ? 'white' : colors.grey[100],
                  },
              },
          },
          legends: {
              text: {
                  fill: theme.palette.mode === 'dark' ? 'white' : colors.grey[100],
              },
          },
          tooltip: {
              container: {
                  color: colors.primary[500],
              },
          },
      }}
  />
);
};

export default NewPieChart;
