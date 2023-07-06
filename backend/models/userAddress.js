import mongoose from 'mongoose';

const userAddressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  zipCode: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

const UserAddress = mongoose.model('UserAddress', userAddressSchema);

export default UserAddress;