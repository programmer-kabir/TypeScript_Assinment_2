import { Schema, model } from 'mongoose';
import { TAddress, TOrders, TUser, UserModel } from './user.interface';

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
  password: { type: String, required: [true, 'Password is required'] },
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

// Create a custom mehthod
userSchema.statics.isUserExists = async function(userId:number){
  const existingUser = await User.findOne({ userId });
  return existingUser;
}

export const User = model<TUser, UserModel>('User', userSchema);
