module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_here',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/search_functionality',
};
