"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
// const createUserInDB = async (user: TUser) => {
//   if (!await User.isUserExists(user.userId)) {
//     throw new Error('User already exists!');
//   }
//   const result = await User.create(user);
//   return result;
// };
const createUserInDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(userData);
    return result;
});
const getAllUserFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find();
    return result;
});
// userId data find by all users
const getSingleUserFromDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ userId });
    return result;
});
// Put User data
const updateSingleUserData = (userId, updatedUserData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.updateOne({ userId }, { $set: updatedUserData }, { new: true });
    return result;
});
// Delete User by id
const deleteUserData = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.deleteOne({ userId });
    return result;
});
// 
const createOrderToDB = (userId, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_model_1.User();
    // console.log(userId);
    if (!(yield user.isUserExists(userId))) {
        throw new Error('User not found');
    }
    const result = yield user_model_1.User.updateOne({
        userId,
    }, {
        $push: {
            orders: orderData,
        },
    });
    return result;
});
const getAllOrderByUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_model_1.User();
    if (!(yield user.isUserExists(userId))) {
        throw new Error('User not found');
    }
    const result = yield user_model_1.User.aggregate([
        { $match: { userId: userId } },
        { $project: { orders: 1, _id: 0 } },
    ]);
    return result;
});
const getTotalPriceOfOrdersFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_model_1.User();
    // if (!(await user.isU(userId))) {
    //   throw new Error('User not found');
    // }
    const result = yield user_model_1.User.aggregate([
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
});
exports.UserServices = {
    createUserInDB,
    getAllUserFromDb,
    getSingleUserFromDb,
    updateSingleUserData,
    deleteUserData,
    createOrderToDB,
    getAllOrderByUserFromDB,
    getTotalPriceOfOrdersFromDB
};
