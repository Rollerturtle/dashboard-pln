// NewDataTable.jsx
import React, {useState} from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import { Box, LinearProgress, Typography } from '@mui/material';
import { tokens } from "../theme"; // Adjust the path to where your theme tokens are stored
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const IncreaseCell = (params) => {
  const theme = useTheme();
  const value = params.value;
  let color;
  let prefixedValue = value.toFixed(1); // Format the number to 1 decimal place

  if (value > 0) {
    color = theme.palette.success.main;
    prefixedValue = `+${prefixedValue}`; // Prefix with plus if positive
  } else if (value < 0) {
    color = theme.palette.error.main;
  } else {
    color = '#3B3C36'; // Neutral grey color for zero
  }

  // Styles for the increase cell
  const textStyle = {
    color: color,
    fontWeight: 'bold',
  };

  return (
    <Typography sx={textStyle}>
      {prefixedValue}%
    </Typography>
  );
};

const StatusCell = (params) => {
  const theme = useTheme();
  const value = params.value;
  const isAchieved = value >= 100;

  // Styles for the status cell
  const statusStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: isAchieved ? theme.palette.success.main : theme.palette.error.main,
  };

  // Choose the icon based on the achievement
  const Icon = isAchieved ? CheckCircleIcon : ErrorIcon;

  return (
    <Box sx={statusStyle}>
      <Icon style={{ marginRight: theme.spacing(1) }} />
      <Typography>{isAchieved ? 'Tercapai' : 'Belum Tercapai'}</Typography>
    </Box>
  );
};



const ProgressBarCell = (params) => {
  const theme = useTheme();
  const value = params.value;
  let color;

  // Determine the color based on the value
  if (value >= 100) {
    color = theme.palette.success.main;
  } else if (value >= 50) {
    color = theme.palette.warning.main;
  } else {
    color = theme.palette.error.main;
  }

  // Styles for the progress bar
  const barStyle = {
    height: '25px', // The height of the progress bar
    width: '100%', // The width of the progress bar
    borderRadius: '4px', // Rounded corners for the progress bar
    '& .MuiLinearProgress-bar': {
      borderRadius: '4px',
      backgroundColor: color, // Color based on the value
    },
  };

  // Styles for the text
  const textStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: theme.palette.common.white,
    pointerEvents: 'none', // To ensure clicks pass through to the progress bar
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <LinearProgress variant="determinate" value={value} sx={barStyle} />
      <Typography variant="body2" sx={textStyle}>
        {`${value.toFixed(1)}%`}
      </Typography>
    </Box>
  );
};




const NewDataTable = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [pageSize, setPageSize] = useState(12);

  const columns = [
    { field: 'Bulan', headerName: 'Month', flex: 1,width: 130, headerAlign: 'center', align: 'center' },
    { field: 'Target', headerName: 'Target', flex: 1,type: 'number', width: 130, headerAlign: 'center', align: 'center' },
    { field: 'Realisasi', headerName: 'Realization', flex: 1,type: 'number', width: 130, headerAlign: 'center', align: 'center' },
    { field: 'Tahun', headerName: 'Year', flex: 1,type: 'number', width: 130, headerAlign: 'center', align: 'center',valueFormatter: (params) => {
      // This will prevent formatting for the year column
      return params.value.toString();
    }, },
    {
      field: 'Pencapaian',
      headerName: 'Achievement (%)',
      width: 130,
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: ProgressBarCell,
    },
    {
      field: 'Status',
      headerName: 'Status',
      width: 120,
      align: 'center',
      flex: 1,
      headerAlign: 'center',
      renderCell: StatusCell,
      // The valueGetter provides the percentage value to the StatusCell
      valueGetter: (params) => params.row.Pencapaian,
    },
    {
      field: 'Kenaikan',
      headerName: 'Increase (%)',
      type: 'number',
      width: 130,
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: IncreaseCell, // Use the custom IncreaseCell for rendering
      valueFormatter: (params) => `${params.value.toFixed(1)}%`, // Format the value as a string with percentage symbol
    },
  ];

  const categoriesToNegate = ['rpt-rct', 'Retur', 'Saldo Tunggakan', 'Piutang Prabayar'];

   const calculatePencapaian = (Target, Realisasi, Bulan) => {
    if (categoriesToNegate.includes(Bulan)) {
      // Logika terbalik untuk kategori tertentu
      return (1 - Realisasi / Target) * 100;
    }
    return (Realisasi / Target) * 100;
  };

  const calculateKenaikan = (currentRealisasi, previousRealisasi, Bulan) => {
    if (categoriesToNegate.includes(Bulan)) {
      // Logika terbalik untuk kategori tertentu
      return previousRealisasi === 0 ? 0 : ((previousRealisasi - currentRealisasi) / previousRealisasi) * 100;
    }
    return currentRealisasi === 0 ? 0 : ((currentRealisasi - previousRealisasi) / previousRealisasi) * 100;
  };

  const rows = data.map((item, index) => {
    let { Target, Realisasi } = item;

    if (categoriesToNegate.includes(item.Bulan)) {
      Target = -Math.abs(Target);
      Realisasi = -Math.abs(Realisasi);
    }

    return {
      id: index,
      Bulan: item.Bulan,
      Target: Target,
      Realisasi: Realisasi,
      Tahun: item.Tahun,
      Pencapaian: item.Pencapaian,
      Kenaikan: item.Kenaikan,
    };
  });

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  const dataGridThemeStyles = {
    '& .MuiDataGrid-root': {
      border: "none",
    },
    '& .MuiDataGrid-cell': {
      borderBottom: "none",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '36px', // Smaller cell height, adjust as needed
    },
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: colors.blueAccent[700],
      borderBottom: "none",
    },
    '& .MuiDataGrid-virtualScroller': {
      backgroundColor: colors.primary[400],
    },
    '& .MuiDataGrid-footerContainer': {
      borderTop: "none",
      backgroundColor: colors.blueAccent[700],
    },
    '& .MuiCheckbox-root': {
      color: `${colors.greenAccent[200]} !important`,
    },
    '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
      color: `${colors.grey[100]} !important`,
    },
  };

  return (
    <Box sx={{ height: '65vh', width: '100%', ...dataGridThemeStyles }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
        rowsPerPageOptions={[6, 12, 24, 36, 48, 60, 72, 84, 96]}
        pagination
        components={{
          Toolbar: GridToolbar,
        }}
        // Add other necessary props and handlers as in your DataTable component
      />
    </Box>
  );
};

export default NewDataTable;
