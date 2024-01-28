import React, { useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Avatar, TextField, Button, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import DialpadOutlinedIcon from '@mui/icons-material/DialpadOutlined';
import { motion, AnimatePresence } from 'framer-motion';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsIcon from '@mui/icons-material/Settings';
import { Menu,IconButton } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext } from '../../theme';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const SignInPage = () => {
  const theme = useTheme();
  const [credentials, setCredentials] = useState({ pin: '', password: '' });
  const [showSignInOptions, setShowSignInOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState('password'); // 'pin' or 'password'
  const [error, setError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const [selectedUser, setSelectedUser] = useState({ 
    id: 1, 
    name: 'Pemasaran', 
    avatar: 'https://fastly.picsum.photos/id/534/536/354.jpg?hmac=tab6Z5S4lvYxZsVcDIxELokB38Smjq75X4XQxpRBgg0', 
    password: 'SARPP_2023', 
    pin: '02022023' 
  });

  const largeAvatarSize = theme.spacing(7); // Or any other size

  const colorMode = useContext(ColorModeContext);

  const styles = {
    backgroundContainer: {
      backgroundImage: theme.palette.mode === 'dark' 
      ? 'linear-gradient(to bottom right, #someDarkColor, #anotherDarkColor)'
      : 'linear-gradient(to bottom right, #83a4d4, #b6fbff)',
      height: '100vh',
     
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    },
    avatar: {
      backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[100] : theme.palette.background.paper,
      width: theme.spacing(14),
      height: theme.spacing(14),
      marginBottom: theme.spacing(2),
    },
    input: {
    margin: theme.spacing(1),
    width: '300px',
    },
    button: {
    marginTop: theme.spacing(2),
    width: '300px',
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
    color: theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light,
    },
    },
    text: {
    color: theme.palette.text.primary,
    },
    userList: {
      position: 'absolute',
      bottom: theme.spacing(2), // Adjusts the spacing from the bottom
      left: theme.spacing(2), // Adjusts the spacing from the left
      maxWidth: theme.spacing(50), // Keeps the maximum width of the user list
      width: 'auto',
       // Optional: set a background color for the user list
    },
    listItem: {
      padding: theme.spacing(2),
      '& .MuiListItemIcon-root': {
        marginRight: theme.spacing(2), // Add spacing to the right of the icon
      },
      '& .MuiListItemText-primary': {
        fontWeight: 'regular', // Optional: make the text bold
      }, // Increase padding for larger list items
    },
    listItemAvatar: {
      // Define a larger avatar for the list items
      width: largeAvatarSize,
      height: largeAvatarSize,
    },
    listItemText: {
      fontSize: '1.25rem',
      margin: theme.spacing(0.5), // Larger text for list items
    },
    iconContainer: {
      position: 'absolute',
      top: theme.spacing(2),
      right: theme.spacing(2),
      display: 'flex',
      alignItems: 'center',
    },
    iconButton: {
      marginLeft: theme.spacing(1),
    },

  };

  const handleSignIn = () => {
    console.log("Entered password:", credentials.password); // Add this line
    console.log("Correct password:", selectedUser.password); // Add this line
    console.log("Entered pin:", credentials.pin); // Add this line
    console.log("Correct pin:", selectedUser.pin); // Add this line

    const isPasswordCorrect = selectedOption === 'password' && credentials.password === selectedUser.password;
    const isPinCorrect = selectedOption === 'pin' && credentials.pin === selectedUser.pin;

    if (isPasswordCorrect || isPinCorrect) {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handlePinChange = (e) => {
    const value = e.target.value;
    const isNumeric = /^\d*$/.test(value); // Regex to test if string contains only digits
    if (isNumeric) {
    setCredentials({ ...credentials, pin: value });
    }
  };

  const toggleSignInOptions = () => {
    setShowSignInOptions(!showSignInOptions);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowSignInOptions(false);
    setError(false); // reset error on option change
  };

  const users = [
    { id: 1, name: 'Pemasaran', avatar: 'https://fastly.picsum.photos/id/534/536/354.jpg?hmac=tab6Z5S4lvYxZsVcDIxELokB38Smjq75X4XQxpRBgg0', password: 'SARPP_2023', pin: '02022023' },
    { id: 2, name: 'Perencanaan', avatar: 'https://fastly.picsum.photos/id/340/536/354.jpg?hmac=TEqJ_0Lnvw38Q0oP_A5i3KuSxW6HV1xiJ3U_W8LW7G4', password: 'PER_2023', pin: '02012023' },
    { id: 3, name: 'Teknologi', avatar: 'https://fastly.picsum.photos/id/402/536/354.jpg?hmac=UbjPJDMe5A-FkmgSVsRgdEfhBcqEngAZP6Z9bbHkYR0', password: 'TEL_2023', pin: '11012023' },
    { id: 4, name: 'Konstruksi', avatar: 'https://fastly.picsum.photos/id/1042/536/354.jpg?hmac=ufUb_vh2UOOUcIrQWrUWzj_um4-ucXsMUkjq9ysdgyM', password: 'KONS_2023', pin: '00002023' },
    // ... other users ...
  ];
  
  // Handler for user selection
  const handleUserSelect = (userId) => {
    const selected = users.find(u => u.id === userId);
    setSelectedUser(selected);
    console.log("Selected user:", selected); // Add this line
    setAnchorEl(null); // Close the menu
  };

  const [isUserListOpen, setIsUserListOpen] = useState(false);
  
  const toggleUserList = () => {
    setIsUserListOpen(!isUserListOpen);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    isAuthenticated ? (
      
      <AnimatePresence>
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{
            hidden: { opacity: 0, y: '0%' },
            visible: { opacity: 1, y: '0%' },
            exit: { opacity: 0, y: '-100%' }
          }}
          onAnimationComplete={() => {
            setTimeout(() => {
              if (!error) {
                navigate('/dashboard');
              }
            }, 500); // Delay navigation to allow animation to complete
          }}
          sx={styles.backgroundContainer}
        >
          {/* Content for transition */}
        </motion.div>
      </AnimatePresence>
    ) : (
      <>

      {/* ... */}
      <Box sx={styles.iconContainer}>
      <IconButton color="inherit" onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <NightsStayIcon />}
      </IconButton>

  <IconButton color="inherit" sx={styles.iconButton} onClick={handleMenu}>
    <AccountCircleIcon />
  </IconButton>
  <Menu
    id="menu-appbar"
    anchorEl={anchorEl}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    keepMounted
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    open={open}
    onClose={handleClose}
  >
    {users.map((user) => (
      <MenuItem key={user.id} onClick={() => handleUserSelect(user.id)} sx={{ display: 'flex', alignItems: 'center' }}>
      <ListItemIcon sx={{ minWidth: '40px' }}> {/* Adjust the min-width as needed */}
        <Avatar src={user.avatar} sx={{ width: largeAvatarSize, height: largeAvatarSize, marginRight: '10px' }} /> {/* Adjust marginRight for spacing */}
      </ListItemIcon>
      <ListItemText primary={user.name} primaryTypographyProps={{ style: styles.listItemText }} />
    </MenuItem>
    ))}
  </Menu>
      </Box>
      {/* ... */}

        <Box sx={styles.backgroundContainer}>
        <Avatar src={selectedUser.avatar} sx={styles.avatar} />
      <Typography variant="h5" sx={styles.text}>
        {selectedUser.name}
      </Typography>
          {selectedOption === 'password' ? (
            <TextField
              sx={styles.input}
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              error={error}
              helperText={error ? "Incorrect password. Please try again." : ""}
            />
          ) : (
            <TextField
              sx={styles.input} 
              id="pin"
              label="PIN"
              variant="outlined"
              type="text"
              inputMode="numeric"
              autoComplete="current-pin"
              value={credentials.pin}
              onChange={handlePinChange}
              error={error}
              helperText={error ? "Incorrect PIN. Please try again." : ""}
            />
          )}
  
          <Button sx={styles.button} variant="outlined" color="primary" onClick={handleSignIn}>
            Sign in
          </Button>
          <Button sx={styles.text} variant="text" onClick={toggleSignInOptions}>
            Sign-in options
          </Button>
          {showSignInOptions && (
            <Box>
              <Button
                sx={{ ...styles.button, mt: 1 }}
                startIcon={<DialpadOutlinedIcon />}
                onClick={() => handleOptionClick('pin')}
              >
                PIN
              </Button>
              <Button
                sx={{ ...styles.button, mt: 1 }}
                startIcon={<LockOutlinedIcon />}
                onClick={() => handleOptionClick('password')}
              >
                Password
              </Button>
            </Box>
          )}
        </Box>
      </>
    )
  );
};

export default SignInPage;