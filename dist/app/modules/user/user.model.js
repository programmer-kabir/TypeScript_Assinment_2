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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const userSchema = new mongoose_1.Schema({
    userId: { type: String, required: [true, 'ID is required'], unique: true },
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
        street: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true, trim: true },
    },
    email: { type: String, required: [true, 'Email is required'], unique: true },
    // orders: [OrdersSchema],
    orders: [{
            productName: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
        }],
});
userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.orders;
    return userObject;
};
// pre save middleware likes password has
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.salt_Rounds));
        next();
    });
});
// post save middleware / hook
userSchema.post('save', function () { });
// Create a custom mehthod user exists check
userSchema.methods.isUserExists = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.User.findOne({ userId });
        return existingUser;
    });
};
exports.User = (0, mongoose_1.model)('User', userSchema);
