import { Request, Response } from 'express';
import { UserServices } from './UserService';
import { UserValidationSchema } from './User.validators';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    //   console.log(user);
    const { error, value } = UserValidationSchema.validate(user);

    if (error) {
      res.status(500).json({
        success: false,
        error: error,
        message: error.message || 'Something went wrong!',
        code: 500,
        data: null,
      });
    }
    console.log(value);
    const result = await UserServices.createUserIntoDB(user);
    console.log('controller res: ', result);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    }); // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error,
      message: error.message || 'Something went wrong!',
      code: 500,
      data: null,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    }); // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error,
      message: error.message || 'Something went wrong!',
      code: 500,
      data: null,
    });
  }
};

// get user by id
const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getUserByIdFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error,
      message: error.message || 'Something went wrong!',
      code: 500,
      data: null,
    });
  }
};

const updateUserById = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const result = await UserServices.updateUserInDB(
      Number(req.params.userId),
      user,
    );
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    }); // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error,
      message: error.message || 'Something went wrong!',
      code: 500,
      data: null,
    });
  }
};

// delete use using id
const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.deleteUserFromDb(
      Number(req.params.userId),
    );
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    }); // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error,
      message: error.message || 'Something went wrong!',
      code: 500,
      data: null,
    });
  }
};

// store orders to db for specifc uer

const storeOrdrs = async (req: Request, res: Response) => {
  try {
    const { orders } = req.body;
    console.log(orders.orders);
    const result = await UserServices.storeOrdersInDB(
      Number(req.params.userId),
      orders,
    );
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result, // change to null later
    }); // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error,
      message: error.message || 'Something went wrong!',
      code: 500,
      data: null,
    });
  }
};

// get orders by id
const getOrdersById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getOrdersByIdFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error,
      message: error.message || 'Something went wrong!',
      code: 500,
      data: null,
    });
  }
};

const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getTotalPriceValue(Number(userId));
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: { totalPrice: result.toFixed(2) },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error,
      message: error.message || 'Something went wrong!',
      code: 500,
      data: null,
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUser,
  storeOrdrs,
  getOrdersById,
  getTotalPrice,
};
