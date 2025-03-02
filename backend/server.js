import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db.js';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);

app.use(express.json()); // Lets the server use json from the body that gets past up to it inside the requst
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware. This will allow the server to access request.cookies. Since we use JWT we can use request.cookies.jwt. We do this in authMiddleware.js
app.use(cookieParser());

app.use('/api/users', userRoutes);


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