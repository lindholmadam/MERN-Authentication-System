import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';






//-----------------------------------------------------------AUTH USER
// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password, googleToken } = req.body;

  // Check if the user exists with the provided email
  let user = await User.findOne({ email });

  if (user) {
    // If the user exists, authenticate with the password
    if (googleToken) {
      // Authenticate using the Google token
      const token = generateToken(user._id);
      res.json({
        _id: user._id,
        firstName: user.firstName,
        surname: user.surname,
        email: user.email,
        token,
      });
    } else {
      // Authenticate using the regular email and password
      if (await user.matchPassword(password)) {
        generateToken(res, user._id);
        res.json({
          _id: user._id,
          firstName: user.firstName,
          surname: user.surname,
          email: user.email,
        });
      } else {
        res.status(401);
        throw new Error('Invalid email or password');
      }
    }
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});






//-----------------------------------------------------------REGISTER NEW USER
// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {

  const { firstName, surname, email, password
  } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    firstName,
    surname,
    email,
    password,
    address,
  });


  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      surname: user.surname,
      email: user.email,
      address: user.address,
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
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};


//-----------------------------------------------------------GET ALL USERS
// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});





export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
};