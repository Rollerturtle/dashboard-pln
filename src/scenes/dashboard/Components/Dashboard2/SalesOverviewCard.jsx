import React from 'react';
import { Box, Typography, Paper, Avatar, Divider, LinearProgress, styled } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // This assumes you have @mui/icons-material installed
import VisibilityIcon from '@mui/icons-material/Visibility'; // This assumes you have @mui/icons-material installed

// Membuat komponen Divider vertikal khusus
const VerticalDivider = styled(Divider)(({ theme }) => ({
  height: 100, // Sesuaikan dengan kebutuhan
  alignSelf: 'center',
  borderLeftColor: theme.palette.divider,
  position: 'relative', // Untuk positioning Avatar
}));

const CustomAvatar = styled(Avatar)(({ theme }) => ({
  width: 24,
  height: 24,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#f4f4f4', // Sesuaikan warna background
  color: theme.palette.text.primary,
  fontSize:'0.85rem' // Warna teks
}));

function CustomVerticalDivider() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', height: 100 }}>
      <VerticalDivider orientation="vertical">
        <CustomAvatar>VS</CustomAvatar>
      </VerticalDivider>
    </Box>
  );
}

const SalesOverviewCard = () => {
  return (
    <Paper elevation={3} sx={{ borderRadius: '15px', p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', }}>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Box>
          <Typography variant="h5" sx={{fontSize: '1.25rem',}}>Sales Overview</Typography>
          <Typography variant="h4"sx={{ fontWeight: 'medium', fontSize:'2rem', mt:0.5 }}>$42.5k</Typography>
        </Box>
        <Typography variant="body1" sx={{ color: 'success.main', fontSize:'1.15rem'}}>
        +18.2%
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mr: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: '#d6f4f8', mr: 1, width: 30, height: 30, borderRadius: 2, color:'#00bad1' }}>
            <ShoppingCartIcon />
          </Avatar>
          <Typography variant="body1" color="textSecondary" sx={{ fontWeight: 'medium', fontSize:'1.1rem' }}>
            Order
          </Typography>
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 'medium', fontSize:'1.25rem', mt:1.5 }}>
          62.2%
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{fontSize:"1.1rem"}}>
          6,440
        </Typography>
      </Box>


        <CustomVerticalDivider/>
        

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" color="textSecondary" sx={{ fontWeight: 'medium', fontSize:'1.1rem', textAlign:'right' }}>
              Visits
            </Typography>
            <Avatar sx={{ bgcolor: '#e8e6fd', ml: 1, width: 30, height: 30, borderRadius: 2, color:'#766af0' }}>
              <VisibilityIcon />
            </Avatar>
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 'medium', fontSize:'1.25rem', mt:1.5, textAlign:'right' }}>
            25.5%
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'right', fontSize:"1.1rem" }}>
            12,749
          </Typography>
        </Box>
      </Box>

      <LinearProgress variant="determinate" value={65} sx={{ height: 10, borderRadius: 5, mb:2 }} />
    </Paper>
  );
};

export default SalesOverviewCard;
