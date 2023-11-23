import { Schema, model } from 'mongoose';
import { Address, Orders, User } from './user.interface';

const OrdersSchema = new Schema<Orders>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const AddressSchema = new Schema<Address>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const userSchema = new Schema<User>({
  userId: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: true },
  address: AddressSchema,
  email: { type: String, required: true },
  orders: [OrdersSchema],
});

export const UserModel = model<User>('User', userSchema);
