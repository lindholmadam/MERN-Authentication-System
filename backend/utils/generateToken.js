// We will generate a Jason Web Token and store it a http only cookie on the server
// We will write some middleware that will, once we authenticate or register: 
//  1. Create the token
//  2. Store it in an http only cookie which will be sent in every request from that on

import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {  // jwt.sign() creates the token. It takes two parameters: object with the payload (user ID), secret from .env
    expiresIn: '30d',
  });

  // Set JWT as an HTTP-Only cookie to store it on the server the cookie will then be sent on every request from the browser after the user signs in.
  res.cookie('jwt', token, {
    httpOnly: true,
    // "'secure' is only true if it's not in development". Because you do need to have http(S) if setting it to true.
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production (secure-flag (lookup later))
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

};

export default generateToken;