// NewAreaChart:
import React from 'react';
import { ResponsiveLine } from '@nivo/line'; // This is for line charts which can be turned into area charts
import { useTheme } from '@mui/material/styles';
import { tokens } from "../theme"; // Adjust the import path to where your theme tokens are located

const NewAreaChart = ({ data, isDashboard }) => {
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
  
  const chartMargins = isDashboard ? 
  { top: 10, right: 90, left: 40, bottom: 460 } :
  { top: 50, right: 110, bottom: 50, left: 60 };

  return (
    <div style={{ height: 650 }}>
      <ResponsiveLine
        data={transformedData}
        tooltip={CustomTooltip} 
        margin={chartMargins}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: '0', max: 'auto', stacked: true, reverse: false }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Bulan",
          legendOffset: 36,
          legendPosition: 'middle'
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Jumlah Pelanggan",
          legendOffset: -40,
          legendPosition: 'middle'
        }}
        colors={{scheme:"nivo"}}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        useMesh={true}
        enableArea={true}
        areaOpacity={0.65}
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
