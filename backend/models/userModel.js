import mongoose from 'mongoose';
import bcrypt from 'bcrypt';



// ------------------------------------------------------------- MAIN USER
const userSchema = mongoose.Schema({
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    surname: {
      type: String,
      required: true,
      trim: true,
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
    currentAddress: {
      type: String,
    },
    newAddress: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    city: {
      type: String,
    },
  },
  { 
    timestamps: true 
  }
);


    // To establish a relationship between different models


// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) { // 'pre' lets us salt and hash the password before it saved to the database
  
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

});


// So here we create and export the actual User from the user schema.
const User = mongoose.model('User', userSchema);

export default User;









