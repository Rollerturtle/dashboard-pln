import React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import DailySalesCard from './Components/Dashboard2/DailySalesCard'
import SalesOverviewCard from './Components/Dashboard2/SalesOverviewCard'
import EarningsReportCard from './Components/Dashboard2/EarningsReportCard'
import SupportTracker from './Components/Dashboard2/SupportTracker'
import SalesByCountry from './Components/Dashboard1/SalesByCountryCard'
import TotalEarningCard from './Components/Dashboard2/TotalEarningCard'
import MonthlyCampaignState from './Components/Dashboard2/MonthlyCampaignState'
import SourceVisitsCard from './Components/Dashboard2/SourceVisitCard'
import ProjectList from './Components/Dashboard2/ProjectList'
import WebsiteAnalytics from './Components/Dashboard2/WebsiteAnalytics'

const dashboard2 = ({ isSidebar }) => {
  return (
    <Box px={6}>
      <Grid container spacing={6}>

        {/* First Row */}
        <Grid item xs={12} lg={6}>
          <WebsiteAnalytics/>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <DailySalesCard/>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <SalesOverviewCard/>
        </Grid>

        {/* Second Rows */}
        <Grid item xs={12} md={6}>
          <EarningsReportCard/>
        </Grid>
        <Grid item xs={12} md={6}>
          <SupportTracker/>
        </Grid>

        {/* Third Row */}
        <Grid item xs={12} md={6} lg={4}>
          <SalesByCountry/>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TotalEarningCard/>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MonthlyCampaignState/>
        </Grid>

        {/* Fourth Row */}
        <Grid item xs={12} md={6} lg={4}>
          <SourceVisitsCard/>
        </Grid>
        <Grid item xs={12} lg={8}>
          <ProjectList/>
        </Grid>
        
        {/* ... other grid items */}
      </Grid>
    </Box>
  );
}

export default dashboard2