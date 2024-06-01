import React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const dashboard3 = () => {
  return (
    <Box px={6}>
      <Grid container spacing={6}>

        {/* First Row */}
        <Grid item xs={12} md={4} >
          <Paper sx={{ backgroundColor: '#e0f7fa' }}> {/* Light blue background */}
            <Typography variant="h6">Order</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ backgroundColor: '#e0f7fa' }}> {/* Light blue background */}
            <Typography variant="h6">Sales</Typography>
          </Paper>
        </Grid>

        {/* Second Rows */}
        <Grid item xs={12} xl={4}>
          <Paper sx={{ backgroundColor: '#e0f7fa' }}> {/* Light blue background */}
            <Typography variant="h6">Sales</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} xl={8}>
          <Paper sx={{ backgroundColor: '#e0f7fa' }}> {/* Light blue background */}
            <Typography variant="h6">Sales</Typography>
          </Paper>
        </Grid>

        {/* Third Row */}
        <Grid item xs={12} sm={6} lg={4}>
          <Paper sx={{ backgroundColor: '#bbdefb' }}> {/* Light blue background */}
            <Typography variant="h6">Sales by Countries</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Paper sx={{ backgroundColor: '#bbdefb' }}> {/* Light blue background */}
            <Typography variant="h6">Sales by Countries</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Paper sx={{ backgroundColor: '#bbdefb' }}> {/* Light blue background */}
            <Typography variant="h6">Sales by Countries</Typography>
          </Paper>
        </Grid>

        {/* Fourth Row */}
        <Grid item xs={12} sm={6} lg={4}>
          <Paper sx={{ backgroundColor: '#bbdefb' }}> {/* Light blue background */}
            <Typography variant="h6">Sales by Countries</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Paper sx={{ backgroundColor: '#bbdefb' }}> {/* Light blue background */}
            <Typography variant="h6">Sales by Countries</Typography>
          </Paper>
        </Grid>
        
        {/* ... other grid items */}
      </Grid>
    </Box>
  );
}

export default dashboard3