const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataFilePath = path.join(__dirname, '../data/dashboardData.json');

// Helper function to read dashboardData.json
const readData = () => {
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
};

// Helper function to write dashboardData.json
const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// Route to get all data
router.get('/', (req, res) => {
  const data = readData();
  res.json(data);
});

// Route to add new data
router.post('/', (req, res) => {
  const newData = req.body;
  
  const data = readData();
  data.push(newData);
  writeData(data);

  res.status(201).json(newData);
});

// Route to delete data by Unit and Bulan
router.delete('/', (req, res) => {
  const { Unit, Bulan, Tahun } = req.body;

  let data = readData();
  const initialLength = data.length;
  data = data.filter(item => item.Unit !== Unit || item.Bulan !== Bulan || item.Tahun !== Tahun);

  if (data.length === initialLength) {
    return res.status(404).send('Data not found');
  }

  writeData(data);
  res.status(204).send();
});

// Route to update data by Unit, Bulan, and Tahun
router.put('/', (req, res) => {
  const { Unit, Bulan, Tahun, Target, Realisasi, Bagian } = req.body;

  let data = readData();
  const index = data.findIndex(item => item.Unit === Unit && item.Bulan === Bulan && item.Tahun === Tahun);

  if (index === -1) {
    return res.status(404).send('Data not found');
  }

  data[index] = { Unit, Bulan, Tahun, Target, Realisasi, Bagian };
  writeData(data);
  res.json(data[index]);
});

module.exports = router;
