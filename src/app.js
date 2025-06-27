// Entry point for the Express app
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Health check route
app.get('/', (req, res) => {
  res.json({ status: 'API is running' });
});

// Import and use routes here
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const uploadRoutes = require('./routes/upload');
app.use('/upload', uploadRoutes);
app.use('/uploads', express.static(require('path').join(__dirname, '../uploads')));

const searchRoutes = require('./routes/search');
app.use('/search', searchRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// MongoDB connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/search_functionality';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
