import { Request, Response } from 'express';
import { UserServices } from './user.service';
import UserValidationSchema from './user.validation';
import bcrypt from 'bcrypt';
import config from '../../config';
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message:'something went wrong',
      error,
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDb();
    if (!result || result.length === 0) {
      res.status(404).json({
        success: false,
        message: 'somethin went wrong on fetching',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Users fetched successfully!',
        data: result,
      });
    }
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
    if (!result) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// update data
const updateUser = async (req: Request, res: Response) => {
  try {
    // Validate and extract data from the request body
    const { userId } = req.params;
    const body = req.body;
    const password = body.password;
    if (password) {
      const hashedPassword = await bcrypt.hash(
        password,
        Number(config.salt_Rounds),
      );
      body.password = hashedPassword;
    }
    const result = await UserServices.updateSingleUserData(userId, body);
    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Filed Not found!',
        error: {
          code: 404,
          description: 'Filed Not found!',
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'User update successfully!',
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong on updating',
      error,
    });
  }
};

// Delete User
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.deleteUserData(userId);

    if (result.deletedCount && result.deletedCount > 0) {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong on deleting',
      error,
    });
  }
};


// 
const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orderData = req.body;

    // console.log(userId, orderData);
    const result = await UserServices.createOrderToDB(userId, orderData);
    res.status(200).json({
      success: true,
      message: 'order created successfully!',
      data: null,
    });
  } catch (err) {
    res.status(400).json({

      success: false,
      // message: err.message,
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getAllOrderByUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'Order faced successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      // message: error.message,
      error: {
        code: 400,
        description: 'User not found!',
      },
    });
  }
};

const getTotalPriceOfOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.getTotalPriceOfOrdersFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      // message: error.message,
      error: {
        code: 400,
        description: 'User not found!',
      },
    });
  }
};


export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  createOrder,
  getAllOrders,
  getTotalPriceOfOrders
};
