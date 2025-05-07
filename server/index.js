require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const booksRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');

// Initialize your app
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true,
}));

// Your other middlewares and routes
app.use(express.json());
app.use('/api/books', booksRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);

// MongoDB connection setup
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});