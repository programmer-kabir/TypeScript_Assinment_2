import { z } from "zod";

const AddressValidationSchema = z.object({
    street: z.string(),
    city: z.string(),
    country: z.string().trim(),
  });
  
  // Define Zod schema for Orders
  const orderSchema = z.object({
    productName: z.string({
      required_error: 'productName is required',
    }),
    price: z.number({
      required_error: 'price is required and must be a number',
    }),
    quantity: z.number({
      required_error: 'quantity is required and must be a number',
    }),
  });
  
  
  // Define Zod schema for User
  const UserValidationSchema = z.object({
    userId: z.string(),
    username: z.string(),
    password: z.string(),
    fullName: z.object({
      firstName: z.string().trim(),
      lastName: z.string().trim(),
    }),
    age: z.number(),
    isActive: z.boolean(),
    hobbies: z.array(z.string()),
    address: AddressValidationSchema,
    email: z.string().email(),
    orders: z.array(orderSchema).optional(),
  })
  export default UserValidationSchema;