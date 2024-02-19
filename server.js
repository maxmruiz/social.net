const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);


const thoughtRoutes = require('./routes/thoughtRoutes');
app.use('/api', thoughtRoutes);


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});