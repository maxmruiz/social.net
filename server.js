const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON
app.use(express.json());

// Import routes
const userRoutes = require('./routes/userRoutes');
const thoughtRoutes = require('./routes/thoughtRoutes');

// Use routes
app.use('/api', userRoutes);
app.use('/api', thoughtRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
