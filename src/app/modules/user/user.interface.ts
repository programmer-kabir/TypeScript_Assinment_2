import { Model } from "mongoose";

export type TOrders = {
  productName: string;
  price: number;
  quantity: number;
};
export type TAddress = {
  street: string;
  city: string;
  country: string;
};
export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: [string, string];
  address: TAddress;
  orders: TOrders;
};

export interface UserModel extends Model<TUser> {
  isUserExists(userId: number): Promise<TUser | null>;
}
