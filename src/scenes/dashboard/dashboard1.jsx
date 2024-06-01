import React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import OrderCard from './Components/Dashboard1/OrderCard'
import SalesCard from './Components/Dashboard1/SalesCard'
import TotalCard from './Components/Dashboard1/TotalCard'
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RevenueGrowthCard from './Components/Dashboard1/RevenueCard'
import RadarCard from './Components/Dashboard1/RadarCard'
import EarningsReportCard from './Components/Dashboard1/EarningReportCard'
import SalesByCountryCard from './Components/Dashboard1/SalesByCountryCard'
import ProjectStatusCard from './Components/Dashboard1/ProjectStatusCard'
import ActiveProjectsCard from './Components/Dashboard1/ActiveProjectCard'
import LastTransactionCard from './Components/Dashboard1/LastTransaction'
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';

const dashboard1 = () => {
  return (
    <Box px={6}>
      <Grid container spacing={6}>
        {/* First Row */}
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <OrderCard/>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <SalesCard/>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
        <TotalCard
          title="Total Pendapatan"
          bagian="Pendapatan"
          icon={AttachMoneyIcon}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <TotalCard
          title="Total Penjualan"
          bagian="Penjualan"
          icon={ElectricBoltIcon}
        />
      </Grid>
        <Grid item xs={12} md={8} lg={4}>
          <RevenueGrowthCard />
        </Grid>

        {/* Second Row */}
        <Grid item xs={12} lg={8}>
          <EarningsReportCard/>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <RadarCard/>
        </Grid>

        {/* Third Row */}
        <Grid item xs={12} md={6} lg={4}>
          <SalesByCountryCard/>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <ProjectStatusCard/>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <ActiveProjectsCard/>
        </Grid>

        {/* Fourth Row
        <Grid item xs={24} md={12}>
          <LastTransactionCard/>
        </Grid> */}


        {/* ... other grid items */}
      </Grid>
    </Box>
  );
}

export default dashboard1