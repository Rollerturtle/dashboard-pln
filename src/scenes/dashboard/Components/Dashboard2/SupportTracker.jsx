import React from 'react';
import { Paper, Box, Typography, Avatar, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TicketsIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import ChecksIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ClocksIcon from '@mui/icons-material/AccessTimeOutlined';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis, Tooltip } from 'recharts';

const data = [
  { name: 'Aspen', uv: 400, fill: '#8884d8' },
  { name: 'Birch', uv: 300, fill: '#83a6ed' },
  { name: 'Dogwood', uv: 300, fill: '#8dd1e1' },
  { name: 'Linden', uv: 200, fill: '#82ca9d' },
  { name: 'Pine', uv: 278, fill: '#a4de6c' },
  { name: 'Spruce', uv: 189, fill: '#d0ed57' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
        {/* You can add more details here */}
      </div>
    );
  }

  return null;
};

function SupportTracker() {

  return (
    <Paper elevation={3} sx={{ borderRadius: '15px', p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '460px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Box>
          <Typography variant="h5" sx={{fontSize: '1.5rem',}}>Support Tracker</Typography>
          <Typography variant="body2"sx={{fontSize: '1.15rem', color: 'text.secondary',}}>Last 7 Days</Typography>
        </Box>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
            <Typography variant="h2" color="primary" sx={{ fontSize: '3rem' }}>164</Typography>
            <Typography variant="body1" sx={{ fontSize: '1rem', color: 'text.secondary', }}>Total Tickets</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar 
                sx={{ 
                    bgcolor: 'secondary.main', 
                    width: 32, 
                    height: 32, 
                    borderRadius: 2, // Adjust this value to match the corner radius in your image
                    boxShadow: 3 // This applies the theme's z-index 3 box-shadow, you can customize it
                }}
            >
                <TicketsIcon />
            </Avatar>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 'normal', fontSize: '1.15rem' }}>New Tickets</Typography>
                <Typography variant="body2" sx={{ fontSize: '0.85rem', color: 'text.secondary', }}>142</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ 
                    bgcolor: 'secondary.main', 
                    width: 32, 
                    height: 32, 
                    borderRadius: 2, // Adjust this value to match the corner radius in your image
                    boxShadow: 3 // This applies the theme's z-index 3 box-shadow, you can customize it
                }}><ChecksIcon /></Avatar>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 'normal', fontSize: '1.15rem' }}>Open Tickets</Typography>
                <Typography variant="body2" sx={{fontSize: '0.85rem', color: 'text.secondary', }}>28</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ 
                    bgcolor: 'secondary.main', 
                    width: 32, 
                    height: 32, 
                    borderRadius: 2, // Adjust this value to match the corner radius in your image
                    boxShadow: 3 // This applies the theme's z-index 3 box-shadow, you can customize it
                }}><ClocksIcon /></Avatar>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 'normal', fontSize: '1.15rem' }}>Response Time</Typography>
                <Typography variant="body2" sx={{ fontSize: '0.85rem', color: 'text.secondary', }}>1 Day</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: '60%', height: 400, position: 'relative', mt: -7 }}>
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="10%"
            outerRadius="80%"
            barSize={15}
            data={data}
            startAngle={0}
            endAngle={360}
          >
            <PolarAngleAxis type="number" domain={[0, 'dataMax']} angleAxisId={0} tick={false} />
            <RadialBar
              clockWise
              dataKey="uv"
              label={false} // This will hide the labels on the bars
              background
            />
            <Tooltip 
              formatter={(value, name, props) => [value, name]} // Custom formatter for tooltip
              content={<CustomTooltip />} // This is an optional custom Tooltip component
            />
            {/* Include the Legend if needed */}
          </RadialBarChart>
        </ResponsiveContainer>
      </Box>
      </Box>
    </Paper>
  );
}

export default SupportTracker;
