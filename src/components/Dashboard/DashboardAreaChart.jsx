// DashboardAreaChart.js
import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { useTheme } from '@mui/material/styles';
import { tokens } from "../../theme"; // Sesuaikan path ini dengan lokasi theme Anda
import { mockAreaData as data } from './mockdata'; // Asumsi data sudah di-import dengan benar

const DashboardAreaChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Transformasi data untuk format yang sesuai dengan Nivo Line Chart
  const transformedData = [
    {
      "id": "Target Saldo Tunggakan",
      "data": data.map(item => ({
        "x": item.bulan,
        "y": item["Target Saldo Tunggakan"]
      }))
    },
    {
      "id": "Realisasi Saldo Tunggakan",
      "data": data.map(item => ({
        "x": item.bulan,
        "y": item["Realisasi Saldo Tunggakan"]
      }))
    },
    {
      "id": "Target Saldo Retur",
      "data": data.map(item => ({
        "x": item.bulan,
        "y": item["Target Saldo Retur"]
      }))
    },
    {
      "id": "Realisasi Saldo Retur",
      "data": data.map(item => ({
        "x": item.bulan,
        "y": item["Realisasi Saldo Retur"]
      }))
    }
  ];

  return (
    <div style={{ height: 250 }}>
      <ResponsiveLine
        data={transformedData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Bulan',
          legendOffset: 46,
          legendPosition: 'middle'
        }}
        enableArea={true}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        useMesh={true}
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

export default DashboardAreaChart;
