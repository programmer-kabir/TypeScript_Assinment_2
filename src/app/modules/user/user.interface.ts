import { Model } from 'mongoose';

export type TUser = {
  userId: string;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders?: 
    {
      productName: string;
      price: number;
      quantity: number;
    }[] | undefined,
  
};

export type userMethods = {
  isUserExists(userId: string): Promise<TUser | null>;
};

// export interface UserModel extends Model<TUser> {
//   isUserExists(userId: string): Promise<TUser | null>;
// }
// export interface UserModel extends Model<TUser> {
//   isUserExists(userId: number): Promise<TUser | null>;
// }
export type customModel = Model<TUser, Record<string, never>, userMethods>;
