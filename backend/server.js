// server.js
const express = require('express');
require('dotenv').config();
const connectDB = require('./index');
const cors = require('cors');

const app = express();

app.use(cors()); // Enable CORS for all routes

app.use(express.json()); // To parse JSON requests

connectDB(); // Connect to MongoDB

// Import routes
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const labelRoutes = require('./routes/labelRoutes'); 

// Use routes
app.use('/api/users', userRoutes); 
app.use('/api/notes', noteRoutes);
app.use('/api/labels', labelRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
