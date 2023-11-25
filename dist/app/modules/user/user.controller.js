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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const user_validation_1 = __importDefault(require("./user.validation"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // data Validation by zod
        const { user: userData } = req.body;
        const zodData = user_validation_1.default.parse(userData);
        const result = yield user_service_1.UserServices.createUserInDB(zodData);
        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            error,
        });
    }
});
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserServices.getAllUserFromDb();
        if (!result || result.length === 0) {
            res.status(404).json({
                success: false,
                message: 'somethin went wrong on fetching',
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: 'Users fetched successfully!',
                data: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'something went wrong on fetching',
            error,
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UserServices.getSingleUserFromDb(userId);
        if (!result) {
            res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: 'User fetched successfully!',
                data: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
// update data
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate and extract data from the request body
        const { userId } = req.params;
        const body = req.body;
        const password = body.password;
        if (password) {
            const hashedPassword = yield bcrypt_1.default.hash(password, Number(config_1.default.salt_Rounds));
            body.password = hashedPassword;
        }
        const result = yield user_service_1.UserServices.updateSingleUserData(userId, body);
        if (!result) {
            res.status(404).json({
                success: false,
                message: 'Filed Not found!',
                error: {
                    code: 404,
                    description: 'Filed Not found!',
                },
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: 'User update successfully!',
                data: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong on updating',
            error,
        });
    }
});
// Delete User
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UserServices.deleteUserData(userId);
        if (result.deletedCount && result.deletedCount > 0) {
            res.status(200).json({
                success: true,
                message: 'User deleted successfully!',
                data: result,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong on deleting',
            error,
        });
    }
});
// 
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const orderData = req.body;
        // console.log(userId, orderData);
        const result = yield user_service_1.UserServices.createOrderToDB(userId, orderData);
        res.status(200).json({
            success: true,
            message: 'order created successfully!',
            data: null,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            // message: err.message,
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UserServices.getAllOrderByUserFromDB(userId);
        res.status(200).json({
            success: true,
            message: 'Order faced successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            // message: error.message,
            error: {
                code: 400,
                description: 'User not found!',
            },
        });
    }
});
const getTotalPriceOfOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UserServices.getTotalPriceOfOrdersFromDB(userId);
        res.status(200).json({
            success: true,
            message: 'Total price calculated successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            // message: error.message,
            error: {
                code: 400,
                description: 'User not found!',
            },
        });
    }
});
exports.userController = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser,
    createOrder,
    getAllOrders,
    getTotalPriceOfOrders
};
