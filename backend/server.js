import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db.js';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
// import passport from 'passport';
// import googleAuthStrategy from './controllers/googleAuthStrategy.js'; // Import the Google Auth strategy
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// If the specified PORT is't found for some reason - use port 5000
const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Passport middleware
// app.use(passport.initialize());
// googleAuthStrategy(); // Initialize the Google Auth strategy

app.use('/api/users', userRoutes);
// app.use('/auth/google', userRoutes);


if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);