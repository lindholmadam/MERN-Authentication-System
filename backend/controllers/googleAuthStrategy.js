import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

const googleAuthStrategy = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/auth/google/callback', // Adjust the callback URL based on your app's routes
        passReqToCallback: true,
      },
      async (request, accessToken, refreshToken, profile, done) => {
        try {
          // Check if the user already exists in your database
          let user = await User.findOne({ email: profile.email });

          if (user) {
            // If the user exists, invoke the "done" callback with the user object
            done(null, user);
          } else {
            // If the user doesn't exist, create a new user using the Google profile data
            const newUser = new User({
              firstName: profile.given_name,
              surname: profile.family_name,
              email: profile.email,
              password: '', // You can generate a random password or leave it empty
            });

            // Save the new user to the database
            await newUser.save();

            // Generate a token for the new user
            const token = generateToken(newUser._id);

            // Invoke the "done" callback with the newly created user object and the token
            done(null, { user: newUser, token });
          }
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
};

export default googleAuthStrategy;