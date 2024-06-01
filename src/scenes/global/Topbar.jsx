import React,{useState} from "react";
import { Box, IconButton, useTheme, Avatar, Menu, Divider } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from '@mui/icons-material/FilterList';
import { Popper, MenuItem, MenuList, ClickAwayListener, Paper, Grow, Typography, Select, FormControl, InputLabel, styled} from "@mui/material";
import SyncIcon from "@mui/icons-material/Sync";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { blue } from "@mui/material/colors";
import DialpadOutlinedIcon from '@mui/icons-material/DialpadOutlined';
import ChangePasswordDialog from './changePassPop'

// Membuat komponen Divider horizontal khusus
const HorizontalDivider = styled(Divider)(({ theme }) => ({
  width: '100%', // Lebar penuh untuk Divider
  position: 'relative', // Untuk positioning Avatar
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    height: '1px',
    top: '50%',
    borderColor: theme.palette.divider,
  },
  '&::before': {
    left: 0,
    right: '50%',
    marginRight: '14px', // Setengah dari ukuran avatar (28px / 2)
  },
  '&::after': {
    left: '50%',
    marginLeft: '14px', // Setengah dari ukuran avatar (28px / 2)
  }
}));

const CustomAvatar = styled(Avatar)({
  width: 48,
  height: 48,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

function CustomHorizontalDivider() {
  return (
    <Box mt={7} mb={2}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', width: '100%' }}>
        <Typography variant="subtitle1" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', mt: -5, color:"#ffffff" }}>Admin</Typography>
        <HorizontalDivider />
        <CustomAvatar src="/path-to-your-image.jpg" /> {/* Update path to avatar image */}
      </Box>
    </Box>
  );
}

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAvatarClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };


  return (
    <Box display="flex" justifyContent="space-between" px={6} py={4}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleMenuClick}>
        <PersonOutlinedIcon />
      </IconButton>
      <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            sx: {
              width: 225, // Mengatur lebar menu menjadi 300px
              maxHeight: 300, // Mengatur maksimum tinggi menu menjadi 400px
              overflow: 'auto',
              borderRadius: 3, // Menambahkan scroll jika isi lebih dari tinggi maksimum
              position: 'relative', // Untuk memungkinkan positioning anak elemen
            }
          }}
        >
          <Box sx={{ backgroundColor: '#826AED', height: 64, width: '100%', position: 'absolute', top: 0, left: 0 }} />
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <CustomHorizontalDivider />
            <Typography variant="subtitle1" sx={{ textAlign: 'center', mt: 4 }} >Bag. Pemasaran</Typography>
            <Typography variant="body2" sx={{ textAlign: 'center' }} color="text.secondary">
              pln123@pln.co.id
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 1, mt: 0.5, mb: 1 }}>
              <Avatar
                sx={{
                  bgcolor: '#826AED',
                  color: 'info.contrastText',
                  width: 32,
                  height: 32,
                  mx: 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onClick={handleAvatarClick}
              >
                <VpnKeyIcon />
              </Avatar>
              <Avatar
                sx={{
                  bgcolor: '#826AED',
                  color: 'info.contrastText',
                  width: 32,
                  height: 32,
                  mx: 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onClick={handleAvatarClick}
              >
                <DialpadOutlinedIcon />
              </Avatar>
            </Box>
          </Box>
        </Menu>
        <ChangePasswordDialog open={dialogOpen} onClose={handleDialogClose} />

      </Box>
    </Box>
  );
};

export default Topbar;
