"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const AddressValidationSchema = zod_1.z.object({
    street: zod_1.z.string(),
    city: zod_1.z.string(),
    country: zod_1.z.string().trim(),
});
// Define Zod schema for Orders
const orderSchema = zod_1.z.object({
    productName: zod_1.z.string({
        required_error: 'productName is required',
    }),
    price: zod_1.z.number({
        required_error: 'price is required and must be a number',
    }),
    quantity: zod_1.z.number({
        required_error: 'quantity is required and must be a number',
    }),
});
// Define Zod schema for User
const UserValidationSchema = zod_1.z.object({
    userId: zod_1.z.string(),
    username: zod_1.z.string(),
    password: zod_1.z.string(),
    fullName: zod_1.z.object({
        firstName: zod_1.z.string().trim(),
        lastName: zod_1.z.string().trim(),
    }),
    age: zod_1.z.number(),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: AddressValidationSchema,
    email: zod_1.z.string().email(),
    orders: zod_1.z.array(orderSchema).optional(),
});
exports.default = UserValidationSchema;
