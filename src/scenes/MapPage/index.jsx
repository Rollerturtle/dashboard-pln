import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { Icon } from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { Box, Typography, List, ListItem, ListItemText, Divider, Button, TextField, InputAdornment, Dialog, DialogActions, DialogTitle, IconButton, DialogContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AddIcon from '@mui/icons-material/Add';
import RestoreIcon from '@mui/icons-material/Restore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Dropzone from 'react-dropzone';

// Haversine formula to calculate distance between two coordinates
const haversineDistance = (coords1, coords2) => {
  function toRad(x) {
    return x * Math.PI / 180;
  }

  const lat1 = coords1[0];
  const lon1 = coords1[1];
  const lat2 = coords2[0];
  const lon2 = coords2[1];

  const R = 6371; // km

  const x1 = lat2 - lat1;
  const dLat = toRad(x1);
  const x2 = lon2 - lon1;
  const dLon = toRad(x2);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  return d.toFixed(2);
};

const MapPage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);  

  const mapRef = useRef();

  useEffect(() => {
    fetchData();
  }, []);  

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/mapData');
      setData(response.data);
      setFilteredData(response.data);
      console.log("Data refreshed:", response.data);
    } catch (error) {
      console.error('Error fetching map data:', error);
    }
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("User location:", position.coords.latitude, position.coords.longitude);
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }

    // Fetch data from the backend
    axios.get('http://localhost:5000/api/mapData')
      .then(response => {
        console.log("Fetched data:", response.data);
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch(error => console.error('Error fetching map data:', error));
  }, []);

  useEffect(() => {
    if (data.length > 0 && userLocation) {
      const query = searchQuery.toLowerCase();
      setFilteredData(data.filter(item => {
        const distance = haversineDistance(userLocation, [item.KOORDINAT_X, item.KOORDINAT_Y]);
        console.log("Distance calculated:", distance);
        return (
          item.NAMA.toLowerCase().includes(query) ||
          item.ALAMAT.toLowerCase().includes(query) ||
          item.TARIF.toLowerCase().includes(query) ||
          distance.toString().includes(query) ||
          item.DAYA.toString().includes(query)
        );
      }));
    }
  }, [searchQuery, userLocation, data]);

  const generateGoogleMapsLink = (item) => {
    if (!userLocation) return '#'; // Return a placeholder if userLocation is not available

    const baseURL = "https://www.google.com/maps/dir/?api=1";
    const origin = `&origin=${userLocation[0]},${userLocation[1]}`;
    const destination = `&destination=${item.KOORDINAT_X},${item.KOORDINAT_Y}`;
    return `${baseURL}${origin}${destination}`;
  };

  const customIcon = new Icon({
    iconUrl: markerIconPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  });

  const handleOpenDialog = (id) => {
    setSelectedItem(id);
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null); // Reset selected item on close
  };

  const handleDelete = async (itemID) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/mapData/${itemID}`);
      if (response.status === 200) {
        // Update local data state to reflect deletion without re-fetching from server
        const updatedData = data.filter(item => item.IDPEL !== itemID);
        setData(updatedData);
        setFilteredData(updatedData);
        setSnackbar({ open: true, message: 'Item deleted successfully', severity: 'success' });
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      setSnackbar({ open: true, message: 'Failed to delete item', severity: 'error' });
    }
    handleCloseDialog(); // Close the dialog after operation
  };
  
  

  const handleDeleteAll = async () => {
    try {
      const response = await axios.delete('http://localhost:5000/api/mapData/deleteAll');
      if (response.status === 200) {
        setData([]); // Mengosongkan data yang tampil di UI
        setFilteredData([]);
        setSnackbar({ open: true, message: response.data.message, severity: 'error' });
      }
    } catch (error) {
      console.error("Error deleting all data:", error);
      setSnackbar({ open: true, message: 'Failed to delete all data', severity: 'error' });
    }
  };
  
  const handleRecoverAll = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/mapData/recoverAll');
      if (response.status === 200) {
        // Setelah pemulihan data berhasil, ambil data terbaru dari server
        fetchData();
        setSnackbar({ open: true, message: 'All data recovered successfully', severity: 'success' });
      }
    } catch (error) {
      console.error("Error recovering all data:", error);
      setSnackbar({ open: true, message: 'Failed to recover data', severity: 'error' });
    }
  };
  
  const handleOpenUploadDialog = () => setOpenUploadDialog(true);
const handleCloseUploadDialog = () => setOpenUploadDialog(false);

const handleFileChange = (files) => {
  setSelectedFile(files[0]); // Asalkan hanya file tunggal yang diizinkan
};

const handleUpload = async () => {
  if (!selectedFile) {
    console.error('No file selected');
    return;
  }

  const formData = new FormData();
  formData.append('file', selectedFile);

  setUploading(true);
  try {
    const response = await axios.post('http://localhost:5000/api/mapData/uploadExcel', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('Upload successful', response);
    fetchData();  // Fetch the latest data to reflect changes
    setUploading(false);
    setSelectedFile(null);
    handleCloseUploadDialog();
    setSnackbar({ open: true, message: 'File uploaded successfully!', severity: 'success' });
  } catch (error) {
    console.error('Error uploading file', error);
    setUploading(false);
    setSnackbar({ open: true, message: 'Failed to upload file', severity: 'error' });
  }
};


  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
    <Box sx={{ display: 'flex', height: 'calc(100vh - 125px)', px: 6 }}>
      <Box sx={{ flex: 1, height: 'calc(100vh - 125px)', position: 'relative'}}>
        <MapContainer center={userLocation || [-7.405129987322311, 109.35444655296884]} zoom={10} style={{ height: '100%', width: '100%' }} whenCreated={map => mapRef.current = map}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />
          {userLocation && (
            <Marker position={L.latLng(userLocation[0], userLocation[1])} icon={customIcon}>
              <Popup>Your Location</Popup>
            </Marker>
          )}
          {filteredData.map((item) => {
            if (item.KOORDINAT_X !== null && item.KOORDINAT_Y !== null) {
              return (
                <Marker key={item.IDPEL} position={L.latLng(item.KOORDINAT_X, item.KOORDINAT_Y)} icon={customIcon}>
                  <Popup>{item.NAMA}</Popup>
                </Marker>
              );
            } else {
              console.log("Invalid coordinates for item:", item);
              return null;
            }
          })}
        </MapContainer>
      </Box>
      <Box sx={{ width: '450px', p: 2, overflowY: 'scroll', backgroundColor: '#f5f5f5' }}>
  
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
  <Typography variant="h4" gutterBottom>Cari Pelanggan</Typography>
  <Box sx={{mb: 1, display: 'flex', gap: 1}}>
  <Button
    sx={{
      minWidth: 34,
      width: 34, // Mengatur lebar button
      height: 34, // Mengatur tinggi button
      bgcolor: 'grey.300',
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& .MuiButton-startIcon': { // Menargetkan startIcon
        margin: 0 // Menghilangkan margin untuk memastikan ikon rata tengah
      },
      '&:hover': {
        bgcolor: 'grey.400'
      }
    }}
    onClick={handleOpenUploadDialog}
    startIcon={<AddIcon />}
    color="success"
  />

  <Button
    sx={{
      minWidth: 34,
      width: 34,
      height: 34,
      bgcolor: 'grey.300',
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& .MuiButton-startIcon': {
        margin: 0
      },
      '&:hover': {
        bgcolor: 'grey.400'
      }
    }}
    startIcon={<RestoreIcon />}
    onClick={handleRecoverAll}
    color="info"
  />
  <Button
    sx={{
      minWidth: 34,
      width: 34,
      height: 34,
      bgcolor: 'grey.300',
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& .MuiButton-startIcon': {
        margin: 0
      },
      '&:hover': {
        bgcolor: 'grey.400'
      }
    }}
    startIcon={<DeleteForeverIcon />}
    onClick={handleDeleteAll}
    color="error"
  />
  </Box>
</Box>
  <TextField
    fullWidth
    variant="outlined"
    placeholder="Search for a location"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
    sx={{ mb: 2 }}
  />
  
  <Typography variant="body2" sx={{ mb: 2 }}>Showing {filteredData.length} locations</Typography>
  <List>
  {filteredData.map((item) => (
    <Box key={item.IDPEL} sx={{ mb: 2, backgroundColor: '#ffffff', boxShadow: '0px 2px 5px rgba(0,0,0,0.1)', borderRadius: '4px', p: 2, position: 'relative' }}>
      <ListItem alignItems="flex-start">
      <IconButton onClick={() => handleOpenDialog(item.IDPEL)} sx={{ position: 'absolute', right: 0, top: 0 }}>
        <CloseIcon />
      </IconButton>
        <ListItemText
          primary={`${item.NAMA} - ${userLocation ? `${haversineDistance(userLocation, [item.KOORDINAT_X, item.KOORDINAT_Y])} km away` : 'Calculating distance...'}`}
          secondary={
            <>
              <Typography component="span" variant="body2" color="text.secondary" sx={{ display: 'block', borderBottom: `2px solid rgba(0, 0, 0, 0.12)`, pb: 2, pt: 2 }}>
                Tarif / Daya : {item.TARIF} / {item.DAYA}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 2 }}>
                <PinDropOutlinedIcon sx={{ mt: '-2px', mr: 1, color: 'text.secondary' }} />
                <Typography component="span" variant="body2" color="text.secondary" sx={{ flexGrow: 1, borderBottom: `2px solid rgba(0, 0, 0, 0.12)`, pb: 2 }}>
                  {item.ALAMAT}
                </Typography>
              </Box>
            </>
          }
        />
        {/* Close icon positioned at the top-right corner of the box
        <IconButton onClick={() => handleOpenDialog(item)} sx={{ position: 'absolute', right: 0, top: 0 }}>
          <CloseIcon />
        </IconButton> */}
      </ListItem>
      <Button
        variant="text"
        size="small"
        sx={{
          mt: 1,
          mr: 1,
          textTransform: 'none',
          fontSize: '1rem',
          ':hover': {
            bgcolor: 'transparent'
          }
        }}
        component="a"
        href={generateGoogleMapsLink(item)}
        startIcon={<KeyboardBackspaceIcon sx={{ fontSize: '2rem', color: 'red' }} />}
        target="_blank"
      >
        Rute via Google Maps
      </Button>
    </Box>
  ))}
</List>

</Box>
    </Box>
    <Dialog
  open={openDialog}
  onClose={handleCloseDialog}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>
  <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
  <DialogActions>
    <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
    <Button onClick={() => handleDelete(selectedItem)} color="primary" autoFocus>Delete</Button>
  </DialogActions>

</Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        key={'top' + 'center'}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Dialog open={openUploadDialog} onClose={() => setOpenUploadDialog(false)}>
  <DialogTitle>Upload Excel File</DialogTitle>
  <DialogContent>
    <Dropzone onDrop={handleFileChange}>
      {({ getRootProps, getInputProps }) => (
        <Box
          {...getRootProps()}
          sx={{
            border: '2px dashed #ccc',
            borderRadius: '8px',
            padding: '20px',
            textAlign: 'center',
            cursor: 'pointer',
            bgcolor: 'background.paper',
            '&:hover': {
              bgcolor: 'background.default'
            }
          }}
        >
          <input {...getInputProps()} accept=".xls, .xlsx" />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </Box>
      )}
    </Dropzone>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenUploadDialog(false)} color="primary">
      Cancel
    </Button>
    <Button onClick={handleUpload} color="primary" disabled={uploading}>
      {uploading ? 'Uploading...' : 'Upload'}
    </Button>
  </DialogActions>
</Dialog>

<Snackbar
  open={snackbar.open}
  autoHideDuration={6000}
  onClose={() => setSnackbar({ ...snackbar, open: false })}
  message={snackbar.message}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
>
  <Alert severity={snackbar.severity}>
    {snackbar.message}
  </Alert>
</Snackbar>

    </>

    
  );
};

export default MapPage;