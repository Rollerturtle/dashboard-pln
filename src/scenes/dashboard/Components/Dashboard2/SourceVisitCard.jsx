import React from 'react';
import { Paper, Box, Typography, Avatar, IconButton, Chip, useTheme } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public'; // ganti sesuai icon yang diinginkan
import GroupIcon from '@mui/icons-material/Group'; // ganti sesuai icon yang diinginkan
import EmailIcon from '@mui/icons-material/Email'; // ganti sesuai icon yang diinginkan
import ShuffleIcon from '@mui/icons-material/Shuffle'; // ganti sesuai icon yang diinginkan
import AdvertisementIcon from '@mui/icons-material/AdsClick'; // ganti sesuai icon yang diinginkan
import StarBorderIcon from '@mui/icons-material/StarBorder'; // ganti sesuai icon yang diinginkan
import MoreVertIcon from '@mui/icons-material/MoreVert';

const sourceData = [
    { icon: PublicIcon, mainLabel: 'Direct Source', subLabel: 'Direct link click', value: '1.2k', change: '+4.2%', changeColor: 'success' },
    { icon: GroupIcon, mainLabel: 'Social Networks', subLabel: 'Social Channels', value: '31.5k', change: '+8.2%', changeColor: 'success' },
    { icon: EmailIcon, mainLabel: 'Email Newsletter', subLabel: 'Mail Campaigns', value: '893', change: '+2.4%', changeColor: 'success' },
    { icon: ShuffleIcon, mainLabel: 'Referrals', subLabel: 'Impact Radius Visits', value: '342', change: '-0.4%', changeColor: 'error' },
    { icon: AdvertisementIcon, mainLabel: 'ADVT', subLabel: 'Google ADVT', value: '2.15k', change: '+9.1%', changeColor: 'success' },
    { icon: StarBorderIcon, mainLabel: 'Other', subLabel: 'Many Sources', value: '12.5k', change: '+6.2%', changeColor: 'success' }
  ];
  

const SourceVisitsCard = () => {
  const theme = useTheme();
  
  return (
    <Paper elevation={3} sx={{ borderRadius: '15px', p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Box>
            <Typography variant="h5" sx={{ fontSize: '1.5rem' }}>Source Visits</Typography>
            <Typography variant="body1" sx={{ fontSize: '1.15rem', color: 'text.secondary' }}>38.4k Visitors</Typography>
        </Box>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 3 }}>
        {sourceData.map((source, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Avatar sx={{ 
                    bgcolor: theme.palette.grey[400], 
                    width: 34, 
                    height: 34, 
                    borderRadius: 2, // Adjust this value to match the corner radius in your image
                    boxShadow: 3 // This applies the theme's z-index 3 box-shadow, you can customize it
                }}>
              <source.icon />
            </Avatar>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="body1" sx={{ fontSize: '1.15rem' }}>{source.mainLabel}</Typography>
                <Typography variant="body2" sx={{ fontSize: '1rem', color: 'text.secondary' }}>{source.subLabel}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', mr:2 }}>
                <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.15rem' }}>{source.value}</Typography>
                <Chip label={source.change} sx={{ borderRadius: '4px', backgroundColor: '#dcf4ec', color: '#2cc46c' }} />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default SourceVisitsCard;
