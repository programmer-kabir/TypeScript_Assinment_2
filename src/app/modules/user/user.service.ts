import { TUser } from './user.interface';
import { User } from './user.model';

// const createUserInDB = async (user: TUser) => {
//   if (!await User.isUserExists(user.userId)) {
//     throw new Error('User already exists!');
//   }
//   const result = await User.create(user);
//   return result;
// };
const createUserInDB = async (userData: TUser) => {
  const result = await User.create(userData);
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
const updateSingleUserData = async (userId: string, updatedUserData: TUser) => {
  const result = await User.updateOne({ userId }, { $set: updatedUserData }, { new: true });
  return result;
};

// Delete User by id

const deleteUserData =async (userId:string) => {
  const result = await User.deleteOne({ userId });
  return result;
}

// 
const createOrderToDB = async (userId: string, orderData: TUser) => {
  const user = new User();
  // console.log(userId);
 
  if (!(await user.isUserExists(userId))) {
    throw new Error('User not found');
  }
  const result = await User.updateOne(
    {
      userId,
    },
    {
      $push: {
        orders: orderData,
      },
    },
  );

  return result;
};

const getAllOrderByUserFromDB = async (userId: string) => {
  const user = new User();

  if (!(await user.isUserExists(userId))) {
    throw new Error('User not found');
  }

  const result = await User.aggregate([
    { $match: { userId: userId } },
    { $project: { orders: 1, _id: 0 } },
  ]);

  return result;
};

const getTotalPriceOfOrdersFromDB = async (userId: string) => {
  const user = new User();

  // if (!(await user.isU(userId))) {
  //   throw new Error('User not found');
  // }
  const result = await User.aggregate([
    { $match: { userId: userId } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: {
            $multiply: ['$orders.price', '$orders.quantity'],
          },
        },
      },
    },
    { $project: { _id: 0 } },
  ]);
  return result;
};

export const UserServices = {
  createUserInDB,
  getAllUserFromDb,
  getSingleUserFromDb,
  updateSingleUserData,
  deleteUserData,
  createOrderToDB,
  getAllOrderByUserFromDB,
  getTotalPriceOfOrdersFromDB
};
