import { Request, Response } from 'express';
import { UserServices } from './user.service';
import UserValidationSchema from './user.validation';
const createUser = async (req: Request, res: Response) => {
  try {
    // data Validation by zod

    const { user: userData } = req.body;
    const zodData = UserValidationSchema.parse(userData);
    const result = await UserServices.createUserInDB(zodData);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error,
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDb();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong on fetching',
      error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserFromDb(userId);

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong on fetching',
      error,
    });
  }
};
export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
};
