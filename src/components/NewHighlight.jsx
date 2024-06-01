import React, { useState, useEffect } from 'react';
import { Box, Typography } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const NewHighlightBox = ({
  type = 'bestAchievement',
  percentage = '+15%',
  value = 340,
  target = 'From Target',
  interval = 30000,
}) => {
  const [isGapAnalysis, setIsGapAnalysis] = useState(type === 'gapAnalysis');

  useEffect(() => {
    const toggleBoxType = () => {
      setIsGapAnalysis((prevState) => !prevState);
    };

    const intervalId = setInterval(toggleBoxType, interval);

    return () => clearInterval(intervalId);
  }, [interval]);

  const renderGapAnalysis = () => {
    const styles = {
      highlightBox: {
        border: '2px solid black',
        borderRadius: '8px',
        padding: '15px 20px',
        width: '100%', // Mengubah lebar menjadi 100%
        fontFamily: 'Arial, sans-serif',
        position: 'relative',
      },
      topSection: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      gapAnalysisTitle: {
        fontSize: '20px',
        fontWeight: 'bold',
        margin: '0',
      },
      surplusDeficit: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
        fontSize: '10px',
        margin: '0',
      },
      barchartContainer: {
        display: 'flex',
        alignItems: 'flex-end',
        height: '100px', // Atur tinggi sesuai kebutuhan
        margin: '20px 0',
        position: 'relative',
        padding: '0',
        width: '100%', // Menambahkan lebar 100%
      },
      bar: {
      flex: 1, // Membagi lebar barchart secara merata
      border: '2px solid black',
      backgroundColor: 'white',
      marginRight: '15px',
      position: 'relative',
    },
      caption: {
        fontSize: '12px',
        textAlign: 'center',
        position: 'absolute',
        bottom: '-15px',
        width: '100%',
      },
      monthLabel: {
        display: 'inline-block',
        width: '30px',
        textAlign: 'center',
        fontSize: '10px',
        position: 'absolute',
        bottom: '-20px',
        left: '50%',
        transform: 'translateX(-50%)',
      },
    };

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'];

    return (
      <Box style={styles.highlightBox}>
        <Box style={styles.topSection}>
          <Typography style={styles.gapAnalysisTitle}>Gap Analysis</Typography>
          <Box style={styles.surplusDeficit}>
            <span id="highestText">Highest Surplus: January</span>
            <span id="lowestText">Lowest Deficit: November</span>
          </Box>
        </Box>
        <Box style={styles.barchartContainer}>
          {months.map((month, index) => (
            <div key={index} style={{ ...styles.bar, height: `${(index + 1) * 10}%` }}>
              <span style={styles.monthLabel}>{month}</span>
            </div>
          ))}
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{
      border: 2,
      borderColor: 'black',
      borderRadius: 2,
      p: 2,
      width: '100%',
      minHeight: '140px',
      boxSizing: 'border-box',
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      '& .percentage-box': {
        display: 'inline-block',
        border: 2,
        borderColor: 'black',
        p: '3px 8px',
        borderRadius: 1,
        mr: 1,
        fontWeight: 'bold',
      },
      '& .arrow-and-number': {
        display: 'flex',
        alignItems: 'center',
        '& .number': {
          fontWeight: 'bold',
          fontSize: '24px',
          ml: 1,
        },
      },
    }}>
      {isGapAnalysis ? (
        renderGapAnalysis()
      ) : (
        <>
          <Box className="header" sx={{ display: 'flex', alignItems: 'center' }}>
            <Box className="percentage-box">
              <Typography variant="subtitle1" component="span">
                {percentage}
              </Typography>
            </Box>
            <Typography variant="subtitle1" component="span">
              {target}
            </Typography>
          </Box>
          <Box className="arrow-and-number">
            <ArrowUpwardIcon />
            <Typography variant="h4" component="span" className="number">
              {value}
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              fontStyle: 'italic',
              color: 'grey',
              fontSize: '1rem',
              display: 'block',
              alignSelf: 'left',
            }}
          >
            Pencapaian Terbaik
          </Typography>
        </>
      )}
    </Box>
  );
};

export default NewHighlightBox;