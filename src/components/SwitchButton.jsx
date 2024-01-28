// SwitchButton.jsx
import React, { useState } from 'react';
import { Button, ButtonGroup, Grid, MenuItem, Menu, useTheme, styled } from '@mui/material';

const CustomButton = styled(Button)(({ theme, active }) => ({
  color: theme.palette.grey[500],
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: theme.palette.background.default,
  },
  ...(active && {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
}));

const SwitchButton = ({ viewType, setViewType, chartType, setChartType }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleChartsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (type) => {
    setViewType('Chart');
    setChartType(type);
    handleMenuClose();
  };

  return (
    <Grid container justifyContent="center" sx={{ margin: '20px 0' }}>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <CustomButton onClick={handleChartsClick} active={viewType === 'Charts'}>
          Charts
        </CustomButton>
        <CustomButton onClick={() => setViewType('Table')} active={viewType === 'Table'}>
          Table
        </CustomButton>
      </ButtonGroup>
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.24))',
            mt: 1.5,
            borderRadius: 0, // Creates square edges
            '&:before': { display: 'none' },
            ...theme.typography.body2,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.secondary,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => handleMenuItemClick('Bar')}>Bar Charts</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('Line')}>Line Charts</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('Area')}>Area Charts</MenuItem> {/* Add this line */}
        <MenuItem onClick={() => handleMenuItemClick('Pie')}>Pie Charts</MenuItem> 
      </Menu>
    </Grid>
  );
};

export default SwitchButton;
