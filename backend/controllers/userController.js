import verifyGoogleToken from '../controllers/googleAuth.js';
import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';




//-----------------------------------------------------------AUTH/SIGN IN USER
// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {

  // The destructuring assignment makes it possible to unpack values from arrays, or properties from objects, into distinct variables.
  const { email, password } = req.body;   // Insted of using req.body.email and req.body.password we deconstruct them from req.body

  const user = await User.findOne({ email }); // Check for the email that the user puts in. Takes the user model and find a user which has the email from the user input.
  if (user && (await user.matchPassword(password))) { // If there is a User that matches check and compare that user's hashed password with the 'matchPassword' function created directly in the User Model

    generateToken(res, user._id);

    res.json({  // Here we are responding / sending back a json object that has the user properties and then being saved in the frontend/browser in local storage
      _id: user._id,
      firstName: user.firstName,
      surname: user.surname,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});




const googleAuth = asyncHandler(async (req, res) => {
  const { token } = req.body; // Tar emot token från frontend

  if (!token) {
      res.status(400);
      throw new Error('No Google token provided');
  }

  const googleUser = await verifyGoogleToken(token);

  if (!googleUser) {
      res.status(401);
      throw new Error('Google authentication failed');
  }

  let user = await User.findOne({ email: googleUser.email });

  if (!user) {
      user = await User.create({
          firstName: googleUser.given_name,
          surname: googleUser.family_name,
          email: googleUser.email,
          password: 'google-auth', // Ingen riktig lösenord behövs
      });
  }

  generateToken(res, user._id);

  res.json({
      _id: user._id,
      firstName: user.firstName,
      surname: user.surname,
      email: user.email,
  });
});





//-----------------------------------------------------------REGISTER NEW USER
// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {

  // The destructuring assignment makes it possible to unpack values from arrays, or properties from objects, into distinct variables.
  const { 
    firstName, 
    surname, 
    email, 
    password,
    currentAddress,
    newAddress,
    zipCode,
    city,
  } = req.body; // Instead of using req.body.email etc.. we deconstruct them from req.body

  // Checks if user exists by email 
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // If user doesn't exist we will create the user
  const user = await User.create({
    firstName,
    surname,
    email,
    password,
    currentAddress,
    newAddress,
    zipCode,
    city,
  });

  // if the user gets created
  if (user) {
    generateToken(res, user._id); // Generate a JWT like in the login

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      surname: user.surname,
      email: user.email
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});





//-----------------------------------------------------------GET USER PROFILE
// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      surname: user.surname,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});







//-----------------------------------------------------------UPDATE USER PROFILE
// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.surname = req.body.surname || user.surname;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstName: user.firstName,
      surname: user.surname,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});






//-----------------------------------------------------------LOGOUT USER / CLEAR COOKIE
// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => { // Signing out means "getting rid of the JWT cookie"
  res.cookie('jwt', '', { // To clear the cookie we setting it to an empty string
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};








//-----------------------------------------------------------LOGOUT USER / CLEAR COOKIE right now this works only if admin which we dont have..
// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error('Can not delete admin user');
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});





export {
  authUser,
  googleAuth,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUser
};