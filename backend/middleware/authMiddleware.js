import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';



// User must be authenticated. Lets us protect routes for users that are registered.
const protect = asyncHandler(async (req, res, next) => {
  let token; // We init the token

  token = req.cookies.jwt; // Reads JWT from the 'jwt' cookie. The 'jwt' part comes from generateToken.js where we name it 'jwt'

  if (token) { // if there is a token, we will decode it to get the token _id
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password'); // select('-password') = because this will return all the user-fields we remove the password
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed'); // The user has a token but it's not valid
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});


export default protect;