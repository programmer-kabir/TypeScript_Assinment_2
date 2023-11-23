import { User } from './user.interface';
import { UserModel } from './user.model';

const createUserInDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUserFromDb = async () => {
  const result = await UserModel.find();
  return result;
};

// userId data find by all users
const getSingleUserFromDb = async (userId: string) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

export const UserServices = {
  createUserInDB,
  getAllUserFromDb,
  getSingleUserFromDb,
};
