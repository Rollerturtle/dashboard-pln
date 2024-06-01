const express = require('express');
const multer = require('multer');
const readXlsxFile = require('read-excel-file/node');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const filePath = path.join(__dirname, '../data/mapData.json');

const upload = multer({ dest: 'uploads/' });

router.post('/uploadExcel', upload.single('file'), (req, res) => {
  console.log('Received file:', req.file); // Cetak informasi file yang diterima
  console.log('Received data:', req.body); // Cetak data lain yang mungkin dikirim bersama file

  const excelPath = req.file.path;

  readXlsxFile(excelPath).then((rows) => {
    // Proses file Excel
    const data = rows.slice(1).map(row => ({
      // Assumption: Excel file structure is known and consistent
      UNITUPI: row[0],
      UNITAP: row[1],
      UNITUP: row[2],
      IDPEL: row[3],
      NAMA: row[4],
      ALAMAT: row[5],
      TARIF: row[6],
      DAYA: parseInt(row[7]),
      KOORDINAT_X: parseFloat(row[8]),
      KOORDINAT_Y: parseFloat(row[9])
    }));

    const existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const updatedData = [...existingData, ...data];
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));

    res.send({ message: 'Data successfully added from Excel file', data: updatedData });
  }).catch(error => {
    console.error('Error reading Excel file:', error);
    res.status(500).send({ message: 'Failed to read Excel file', error: error.message });
  });
});

// Function to convert specific fields to int and float
const convertFields = (item) => {
  return {
    ...item,
    UNITUPI: parseInt(item.UNITUPI, 10),
    UNITAP: parseInt(item.UNITAP, 10),
    UNITUP: parseInt(item.UNITUP, 10),
    IDPEL: parseInt(item.IDPEL, 10),
    DAYA: parseInt(item.DAYA, 10),
    KOORDINAT_X: parseFloat(item.KOORDINAT_X),
    KOORDINAT_Y: parseFloat(item.KOORDINAT_Y)
  };
};

// Read CustomerMap
router.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath));
  const convertedData = data.map(convertFields);
  res.json(convertedData);
});

// Create CustomerMap
router.post('/', (req, res) => {
  let newData = req.body;
  newData = convertFields(newData); // Convert newData fields
  const data = JSON.parse(fs.readFileSync(filePath));
  
  data.push(newData);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.json({ message: 'Data added successfully' });
});

// Delete specific CustomerMap entry by IDPEL
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const filteredData = data.filter(item => item.IDPEL !== parseInt(id, 10));
    fs.writeFileSync(filePath, JSON.stringify(filteredData, null, 2));
    res.status(200).send({ message: 'Data deleted successfully' });
  } catch (error) {
    console.error('Error deleting specific item:', error);
    res.status(500).send({ message: 'Error deleting specific item', error: error.message });
  }
});


router.delete('/deleteAll', (req, res) => {
  const filePath = path.join(__dirname, '../data/mapData.json');

  // Coba tulis file dengan array kosong
  fs.writeFile(filePath, JSON.stringify([]), (err) => {
    if (err) {
      console.error('Error writing file during deleteAll:', err);
      return res.status(500).send({ message: 'Error deleting data', error: err.message });
    }
    console.log('All data deleted successfully');
    res.status(200).send({ message: 'All data deleted successfully' });
  });
});



router.post('/recoverAll', (req, res) => {
  const backupPath = path.join(__dirname, '../data/mapData.json');
  
  fs.access(backupPath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error('Backup file not found:', err);
      return res.status(404).send({ message: 'Backup file not found', error: err.message });
    }

    fs.readFile(backupPath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading backup file:', err);
        return res.status(500).send({ message: 'Error reading backup file', error: err.message });
      }

      const filePath = path.join(__dirname, '../data/mapData.json');
      fs.writeFile(filePath, data, (err) => {
        if (err) {
          console.error('Error restoring data:', err);
          return res.status(500).send({ message: 'Error restoring data', error: err.message });
        }
        console.log('Data restored successfully');
        res.status(200).send({ message: 'Data restored successfully', data: JSON.parse(data) });
      });
    });
  });
});






module.exports = router;
