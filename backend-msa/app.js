const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db.js');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/posts', require('./routes/postRoutes.js'));
app.use('/api/animals', require('./routes/animalRoutes.js'));
app.use('/api/users', require('./routes/userRoutes.js'));

// Export the app object
module.exports = app;