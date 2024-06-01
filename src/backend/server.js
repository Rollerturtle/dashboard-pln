const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const authRouter = require('./routes/auth');
const filesRouter = require('./routes/files');
const dashboardDataRouter = require('./routes/dashboardData');
const mapDataRouter = require('./routes/map');

// Use routes
app.use('/api/auth', authRouter);
app.use('/api/files', filesRouter);
app.use('/api/dashboardData', dashboardDataRouter);
app.use('/api/mapData', mapDataRouter);

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
