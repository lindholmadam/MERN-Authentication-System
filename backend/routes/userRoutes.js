import express from 'express';
import { authUser, googleAuth, registerUser, logoutUser, getUserProfile, updateUserProfile, deleteUser } from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js'; // Authenticate User with JWT token.

const router = express.Router();



// All routes starts with /api/users/...
router.route('/').post(registerUser);
router.post('/auth', authUser);
router.post('/google-auth', googleAuth); // <--- NY ROUTE FÖR GOOGLE AUTH
router.post('/logout', logoutUser); // Signing out in this case means "getting rid of the JWT cookie"

router.route('/profile') // To get, update or delete the user profile - the user needs to be registered with valid jwt. ( protect )
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)
    .delete(protect, deleteUser);


// Here we will have the additional routes which will be used inside the user profile verified with the JWT

export default router;