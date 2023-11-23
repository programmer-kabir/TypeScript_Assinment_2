import { z } from "zod";

const AddressValidationSchema = z.object({
    street: z.string(),
    city: z.string(),
    country: z.string().trim(),
  });
  
  // Define Zod schema for Orders
  const OrdersValidationSchema = z.object({
    productName: z.string(),
    price: z.number(),
    quantity: z.number(),
  });
  
  // Define Zod schema for User
  const UserValidationSchema = z.object({
    userId: z.number(),
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
    orders: z.array(OrdersValidationSchema),
  });

  export default UserValidationSchema;