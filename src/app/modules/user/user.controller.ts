import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createUser = async(req: Request, res: Response) => {
  try {
    const {user : userData} = req.body;
    const result = await UserServices.createUserInDB(userData)
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
      error
    });
  }
};
export const userController = {
    createUser,
}