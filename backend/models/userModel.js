import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// ------------------------------------------------------------- ADRESS
// const userAddressSchema = new mongoose.Schema({
//   street: {
//     type: String,
//     required: true,
//   },
//   zipCode: {
//     type: Number,
//     required: true,
//   },
//   city: {
//     type: String,
//     required: true,
//   },
// });

// const UserAddress = mongoose.model('UserAddress', userAddressSchema);




// ------------------------------------------------------------- MAIN USER
const userSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // address: userAddressSchema
  },
  { 
    timestamps: true 
  }
);


    // To establish a relationship between different models
    // The ref stands for "reference" and is used in Mongoose to establish a relationship between different models.
    // userAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'UserAddress'},





// This could have been done in the userController but its cleaner this way 

// Match user entered password to hashed password in database.
//  We add this function "matchPassword" onto our userShema to use it in userController.js
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});









const User = mongoose.model('User', userSchema);

export default User;