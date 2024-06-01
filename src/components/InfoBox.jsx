import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme"; // Make sure the path to your theme tokens is correct
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const InfoBox = ({ title, value, increaseText, IconComponent }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      bgcolor={colors.primary[400]}
      borderRadius="8px"
      p="16px"
      boxShadow={1}
      textAlign="left"
      width="100%"
      m="0 30px"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: '100%',
      }}
    >
      {/* Separate the percentage and the text */}
      <Box display="flex" alignItems="center" mb="10px">
        {/* Background only for percentage */}
        <Box
          bgcolor={colors.blueAccent[100]}
          px="12px"
          py="6px"
          borderRadius="6px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="subtitle2" sx={{ color: colors.blueAccent[700], fontWeight: 'bold' }}>
            {increaseText}%
          </Typography>
        </Box>
        {/* No background for this text */}
        <Typography variant="subtitle2" sx={{ ml: "8px" }}>
          From Last Month
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" mb="8px">
        <IconComponent sx={{ color: colors.grey[100], fontSize: "26px" }} />
        <Typography variant="h4" fontWeight="bold" sx={{ color: colors.grey[100], ml: "8px" }}>
          {value}
        </Typography>
      </Box>
      <Typography variant="subtitle1" sx={{ color: colors.grey[300] }}>
        {title}
      </Typography>
    </Box>
  );
};

export default InfoBox;
