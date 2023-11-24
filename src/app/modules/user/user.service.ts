import { TUser } from './user.interface';
import { User } from './user.model';

const createUserInDB = async (user: TUser) => {
  if (await User.isUserExists(user.userId)) {
    throw new Error('User already exists!');
  }
  const result = await User.create(user);
  return result;
};

const getAllUserFromDb = async () => {
  const result = await User.find();
  return result;
};

// userId data find by all users
const getSingleUserFromDb = async (userId: string) => {
  const result = await User.findOne({ userId });
  return result;
};

// Put User data
const updateSingleUserData =async (userId: string, updatedUserData: Partial<TUser>) => {
  const result = await User.findOneAndUpdate({ userId }, updatedUserData, { new: true });
  return result;
}
// Delete User by id

const deleteUserData =async (userId:string) => {
  const result = await User.deleteOne({ userId });
  return result;
}

export const UserServices = {
  createUserInDB,
  getAllUserFromDb,
  getSingleUserFromDb,
  updateSingleUserData,
  deleteUserData
};
