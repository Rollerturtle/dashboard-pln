import React from 'react';
import { Paper, Box, Typography, Avatar, IconButton, useTheme } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const MonthlyCampaignState = () => {
  const theme = useTheme();
  
  const stats = [
    { icon: EmailIcon, label: 'Emails', value: '12,346', change: '0.3%' },
    { icon: OpenInBrowserIcon, label: 'Opened', value: '8,734', change: '2.1%' },
    { icon: TouchAppIcon, label: 'Clicked', value: '967', change: '1.4%' },
    { icon: AddCircleOutlineIcon, label: 'Subscribe', value: '345', change: '8.5%' },
    { icon: WarningAmberIcon, label: 'Complaints', value: '10', change: '1.5%' },
    { icon: DoNotDisturbOnIcon, label: 'Unsubscribe', value: '86', change: '0.8%' }
  ];

  return (
    <Paper elevation={3} sx={{ borderRadius: '15px', p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',  }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Box>
                <Typography variant="h5" sx={{ fontSize: '1.5rem' }}>Monthly Campaign State</Typography>
                <Typography variant="body1" sx={{ fontSize: '1.15rem', color: 'text.secondary' }}>8.52k Social Visitors</Typography>
            </Box>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 3}}>
        {stats.map((stat, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>            
          <Avatar sx={{ 
                    bgcolor: theme.palette.success.light, 
                    width: 34, 
                    height: 34, 
                    borderRadius: 2, // Adjust this value to match the corner radius in your image
                    boxShadow: 3 // This applies the theme's z-index 3 box-shadow, you can customize it
                }}>
              <stat.icon />
            </Avatar>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Typography variant="body1" sx={{ fontSize: '1.15rem' }}>{stat.label}</Typography>
              <Box sx={{ display: 'flex', gap: 3 }}>
                <Typography variant="body1" sx={{ color: theme.palette.text.secondary, fontSize: '1.15rem' }}>{stat.value}</Typography>
                <Typography variant="body1" sx={{ color: theme.palette.success.light, fontSize: '1.15rem' }}>{stat.change}</Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default MonthlyCampaignState;
