const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const router = express.Router();
const filePath = path.join(__dirname, '../data/files.json');

// Set up storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('Setting file destination');
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    console.log('Setting file name');
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Read files
router.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath));
  res.json(data);
});

// Upload file
router.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  console.log('File uploaded:', file);
  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const data = JSON.parse(fs.readFileSync(filePath));
  data.push({
    name: file.filename,
    originalName: file.originalname,
    size: file.size,
    mimetype: file.mimetype,
    dateModified: new Date().toISOString()
  });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.json({ message: 'File uploaded successfully', file });
});

// Delete file
router.delete('/:filename', (req, res) => {
  const { filename } = req.params;
  let data = JSON.parse(fs.readFileSync(filePath));

  const fileIndex = data.findIndex(file => file.name === filename);
  if (fileIndex === -1) {
    return res.status(404).json({ message: 'File not found' });
  }

  const [fileToDelete] = data.splice(fileIndex, 1);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  const filePathToDelete = path.join(__dirname, '../uploads', fileToDelete.name);
  fs.unlink(filePathToDelete, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
      return res.status(500).json({ message: 'Error deleting file' });
    }
    res.json({ message: 'File deleted successfully' });
  });
});

module.exports = router;
