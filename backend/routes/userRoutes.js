import express from 'express';
import passport from 'passport';
import { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers } from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Route for initiating the Google Authentication process
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Route for handling the Google callback
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Redirect or respond with a token based on the authentication result
    res.redirect('/');
  }
);

router.route('/').post(registerUser).get(protect, getUsers);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;