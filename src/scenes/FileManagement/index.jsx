import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Box, Button, Typography, IconButton, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, Menu, MenuItem, Avatar, 
  Select, FormControl, InputLabel, Snackbar, Alert, Dialog, DialogTitle, 
  DialogContent, DialogActions, CircularProgress
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import Dropzone from 'react-dropzone';

const FileManagement = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [fileTypeFilter, setFileTypeFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/files');
      console.log('Fetched files:', response.data);
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleFileChange = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
    console.log('File selected:', acceptedFiles[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    setUploading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/files/upload', formData);
      console.log('File upload response:', response.data);
      setSelectedFile(null);
      setOpen(false);
      fetchFiles();
      setSnackbarMessage('File uploaded successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error uploading file:', error);
      setSnackbarMessage('Error uploading file');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (filename) => {
    try {
      await axios.delete(`http://localhost:5000/api/files/${filename}`);
      fetchFiles();
      handleCloseMenu();
      setSnackbarMessage('File deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting file:', error);
      setSnackbarMessage('Error deleting file');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleOpenMenu = (event, filename) => {
    setAnchorEl(event.currentTarget);
    setSelectedFileName(filename);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedFileName(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage('');
  };

  const getIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf':
        return <PictureAsPdfIcon />;
      case 'doc':
      case 'docx':
        return <DescriptionIcon />;
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
        return <InsertDriveFileIcon />;
      default:
        return <InsertDriveFileIcon />;
    }
  };

  const handleFileTypeFilterChange = (event) => {
    setFileTypeFilter(event.target.value);
  };

  const handleDateFilterChange = (event) => {
    setDateFilter(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFile(null);
  };

  const handleDoubleClick = (fileName) => {
    window.open(`http://localhost:5000/uploads/${fileName}`, '_blank');
  };

  // Filter files based on selected filters
  const filteredFiles = files.filter(file => {
    const extension = file.originalName.split('.').pop().toLowerCase();
    const matchesFileType = fileTypeFilter === '' || (() => {
      switch (fileTypeFilter) {
        case 'pdf':
          return extension === 'pdf';
        case 'doc':
          return extension === 'doc' || extension === 'docx';
        case 'img':
          return ['png', 'jpg', 'jpeg', 'gif'].includes(extension);
        default:
          return true;
      }
    })();
    const matchesDate = dateFilter === '' || (() => {
      const now = new Date();
      const fileDate = new Date(file.dateModified);

      if (dateFilter === 'today') {
        return fileDate.toDateString() === now.toDateString();
      }

      if (dateFilter === 'this_week') {
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
        return fileDate >= startOfWeek && fileDate <= endOfWeek;
      }

      if (dateFilter === 'this_month') {
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return fileDate >= startOfMonth && fileDate <= endOfMonth;
      }

      return true;
    })();

    return matchesFileType && matchesDate;
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        File Management
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
            <InputLabel>Jenis</InputLabel>
            <Select
              value={fileTypeFilter}
              onChange={handleFileTypeFilterChange}
              label="Jenis"
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="pdf">PDF</MenuItem>
              <MenuItem value="doc">DOC</MenuItem>
              <MenuItem value="img">IMG</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
            <InputLabel>Dimodifikasi</InputLabel>
            <Select
              value={dateFilter}
              onChange={handleDateFilterChange}
              label="Dimodifikasi"
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="this_week">This Week</MenuItem>
              <MenuItem value="this_month">This Month</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button
          variant="contained"
          color="primary"
          startIcon={<CloudUploadIcon />}
          onClick={handleClickOpen}
        >
          Upload
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{fontSize:'1rem'}}>Upload Document</DialogTitle>
        <DialogContent>
          <Dropzone onDrop={handleFileChange} maxSize={25 * 1024 * 1024} accept=".csv, .xls, .xlsx, .png, .jpg, .jpeg, .gif, .pdf, .doc, .docx">
            {({ getRootProps, getInputProps }) => (
              <Box
                {...getRootProps()}
                sx={{
                  border: '2px dashed #ccc',
                  borderRadius: '8px',
                  padding: '20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  backgroundColor: '#f9f9f9',
                  '&:hover': { backgroundColor: '#f1f1f1' }
                }}
              >
                <input {...getInputProps()} />
                {selectedFile ? (
                  <Typography>{selectedFile.name}</Typography>
                ) : (
                  <Typography>Drag and Drop or Click to upload</Typography>
                )}
                <Typography variant="body2" color="textSecondary">
                  Supported formats: CSV, XLS, XLSX, PNG, JPG, JPEG, GIF, PDF, DOC, DOCX. Max Size: 25MB
                </Typography>
              </Box>
            )}
          </Dropzone>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
          >
            {uploading ? <CircularProgress size={24} /> : 'Continue'}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}  // Adjust this line
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nama</TableCell>
              <TableCell align="right">Terakhir Diubah</TableCell>
              <TableCell align="right">Ukuran File</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFiles.map((file, index) => (
              <TableRow key={index} onDoubleClick={() => handleDoubleClick(file.name)}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {getIcon(file.name)}
                    <Typography sx={{ ml: 2 }}>{file.originalName}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">{new Date(file.dateModified).toLocaleDateString()}</TableCell>
                <TableCell align="right">{(file.size / 1024).toFixed(2)} KB</TableCell>
                <TableCell align="right">
                  <IconButton onClick={(event) => handleOpenMenu(event, file.name)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                  >
                    <MenuItem onClick={() => handleDelete(selectedFileName)}>Delete</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      
    </Box>
  );
};

export default FileManagement;
