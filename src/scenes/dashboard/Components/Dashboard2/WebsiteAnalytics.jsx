import React, { useState } from 'react';
import { Paper, Box, Typography, Grid, Avatar, IconButton, Menu, MenuItem, FormControl, InputLabel, Select, Button } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import FilterListIcon from '@mui/icons-material/FilterList';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NewMockData } from '../../../../data/NewMockData';

function WebsiteAnalytics() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedYear, setSelectedYear] = useState('All');
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleReset = () => {
    setSelectedYear('All');
  };

  const slidesData = [
    {
      title: "Website Analytics",
      subtitle: "Total 28.5% Conversion Rate",
      trafficLabel: "Website Traffic",
      traffic: [
        { label: "Sessions", value: "28%" },
        { label: "Page Views", value: "3.1k" },
        { label: "Leads", value: "1.2k" },
        { label: "Conversions", value: "12%" }
      ]
    },
    {
      title: "Mobile Analytics",
      subtitle: "Overall Mobile Traffic",
      trafficLabel: "App Engagement",
      traffic: [
        { label: "App Downloads", value: "1.5k" },
        { label: "Active Users", value: "850" },
        { label: "Leads", value: "1.2k" },
        { label: "Conversions", value: "12%" }
      ]
    },
    {
      title: "Revenue Tracking",
      subtitle: "Revenue Growth",
      trafficLabel: "Revenue Metrics",
      traffic: [
        { label: "Revenue", value: "$12k" },
        { label: "Subscriptions", value: "1.2k" },
        { label: "Leads", value: "1.2k" },
        { label: "Conversions", value: "12%" }
      ]
    }
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => setCurrentSlide(index),
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: '15px', overflow: 'hidden', width: '100%', maxWidth: '870px', margin: 'auto', height: 'auto', padding: '24px' }}>
      <Box sx={{ position: 'relative', overflow: 'hidden', width: '100%' }}>
        <Box sx={{ position: 'absolute', top: 1, right: 15, display: 'flex', gap: 1, margin: 2 }}>
          {slidesData.map((_, i) => (
            currentSlide === i ? 
            <CircleIcon key={i} sx={{ fontSize: '10px', color: 'action.active' }} /> :
            <RadioButtonUncheckedIcon key={i} sx={{ fontSize: '10px', color: 'action.active' }} />
          ))}
        </Box>
        <Slider {...settings}>
          {slidesData.map((slide, index) => (
            <div key={index} style={{ padding: '24px', boxSizing: 'border-box', width: '100%' }}>
              <Typography variant="h5" sx={{ fontSize: '1.5rem' }}>{slide.title}</Typography>
              <Typography variant="subtitle2" sx={{ fontSize: '1rem' }}>{slide.subtitle}</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                    <Typography variant="body1" sx={{ fontSize: "1.15rem" }}>{slide.trafficLabel}</Typography>
                    <Grid container spacing={2}>
                      {slide.traffic.map((item, i) => (
                        <Grid key={i} item xs={6} sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                          <Avatar sx={{ bgcolor: 'primary.main', width: 50, height: 30, borderRadius: 2 }}>{item.value}</Avatar>
                          <Typography variant="body1">{item.label}</Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} style={{ position: 'relative', height: '200px' }}>
                  <img 
                    src="https://demos.pixinvent.com/vuexy-nextjs-admin-template/demo-1/images/cards/graphic-illustration-1.png" 
                    alt="Graphic" 
                    style={{ 
                      position: 'absolute', 
                      bottom: '0', 
                      right: '0', 
                      height: '175px', 
                      width: '175px' 
                    }} 
                  />
                </Grid>
              </Grid>
            </div>
          ))}
        </Slider>
      </Box>
    </Paper>
  );
}

export default WebsiteAnalytics;
