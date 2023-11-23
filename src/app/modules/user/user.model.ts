import { Schema, model } from 'mongoose';
import { TAddress, TOrders, TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const OrdersSchema = new Schema<TOrders>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const AddressSchema = new Schema<TAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true, trim: true },
});

const userSchema = new Schema<TUser, UserModel>({
  userId: { type: Number, required: [true, 'ID is required'], unique: true },
  username: {
    type: String,
    required: [true, 'User Name is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    maxlength: [20, 'password can not be more 20 character'],
  },
  fullName: {
    firstName: {
      type: String,
      required: [true, 'First Name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last Name is required'],
      trim: true,
    },
  },
  age: { type: Number, required: [true, 'Age is required'] },
  isActive: { type: Boolean, required: [true, 'isActive is required'] },
  hobbies: { type: [String], required: [true, 'Hobbies is required'] },
  address: {
    type: AddressSchema,
    required: [true, 'Address is required'],
  },
  email: { type: String, required: [true, 'Email is required'], unique: true },
  orders: [OrdersSchema],
});

// pre save middleware likes password has
userSchema.pre('save', async function (next) {

  const user = this;
 user.password= await  bcrypt.hash(user.password, Number(config.salt_Rounds))
 next()

});

// post save middleware / hook
userSchema.post('save', function () {});

// Create a custom mehthod user exists check
userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);
