// NewAreaChart:
import React from 'react';
import { ResponsiveLine } from '@nivo/line'; // This is for line charts which can be turned into area charts
import { useTheme } from '@mui/material/styles';
import { tokens } from "../theme"; // Adjust the import path to where your theme tokens are located

const NewAreaChart = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Transform data to fit the Nivo Line chart which can be used as an area chart by enabling the 'enableArea' prop
  const transformedData = data.map(serie => ({
    ...serie,
    data: serie.data.map(item => ({
      x: item.x,
      y: item.y
    }))
  }));

  const CustomTooltip = ({ point }) => {
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
        <strong>{point.serieId}</strong> - {point.data.xFormatted}: {point.data.yFormatted}
      </div>
    );
  };
  
  

  return (
    <div style={{ height: 650 }}>
      <ResponsiveLine
        data={transformedData}
        tooltip={CustomTooltip} 
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto', // You can set specific bounds here if needed
          max: 'auto', // You can set specific bounds here if needed
          stacked: false, // Ensure this matches the line chart configuration
          reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Month',
          legendOffset: 46,
          legendPosition: 'middle'
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Value',
          legendOffset: -60,
          legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        enableArea={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: colors.grey[100],
              },
            },
            legend: {
              text: {
                fill: colors.grey[100],
              },
            },
            ticks: {
              line: {
                stroke: colors.grey[100],
                strokeWidth: 1,
              },
              text: {
                fill: colors.grey[100],
              },
            },
          },
          legends: {
            text: {
              fill: theme.palette.mode === 'dark' ? 'white' : colors.grey[100]
            },
          },
          tooltip: {
            container: {
              background: theme.palette.mode === 'dark' ? 'black' : 'white',
              color: theme.palette.mode === 'dark' ? 'white' : 'black',
            },
          },
          grid: {
            line: {
              stroke: colors.grey[100],
            },
          },
        }}
      />
    </div>
  );
};

export default NewAreaChart;
