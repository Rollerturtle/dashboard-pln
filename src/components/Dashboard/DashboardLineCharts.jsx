import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { useTheme } from '@mui/material';

export const DashboardLineChart = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Custom tooltip yang digunakan oleh NewLineChart
  const CustomLineTooltip = ({ point }) => {
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
    <ResponsiveLine
      data={data}
      tooltip={CustomLineTooltip}
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
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            background: theme.palette.mode === 'dark' ? 'black' : 'white',
            color: theme.palette.mode === 'dark' ? 'white' : 'black',
          },
        },
      }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: 0,
        stacked: false,
        reverse: false
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Bulan",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Value",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={true}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        // ...[legends configuration]...
      ]}
      // ...[other props]...
    />
  );
};
