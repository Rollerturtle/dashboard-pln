const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const filePath = path.join(__dirname, '../data/users.json'); // Ensure this path is correct

// Read Users
router.get('/', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(filePath));
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error reading users data' });
  }
});

// Authenticate User
router.post('/login', (req, res) => {
  const { username, password, pin } = req.body;
  try {
    const data = JSON.parse(fs.readFileSync(filePath));
    const user = data.find(user => user.name === username);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordCorrect = password && user.password === password;
    const isPinCorrect = pin && user.pin === pin;

    if (isPasswordCorrect || isPinCorrect) {
      res.json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error during authentication' });
  }
});

// Update User Password
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  try {
    const data = JSON.parse(fs.readFileSync(filePath));

    const userIndex = data.findIndex(user => user.id == id);
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    data[userIndex].password = password;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating password' });
  }
});

module.exports = router;
