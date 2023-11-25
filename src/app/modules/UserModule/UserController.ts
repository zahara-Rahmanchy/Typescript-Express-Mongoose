import { Request, Response } from 'express';
import { UserServices } from './UserService';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body.User;
    //   console.log(user);

    const result = await UserServices.createUserIntoDB(user);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getUserByIdFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUserById = async (req: Request, res: Response) => {
  try {
    const user = req.body.User;
    const result = await UserServices.updateUserInDB(
      Number(req.params.userId),
      user,
    );
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.deleteUserFromDb(
      Number(req.params.userId),
    );
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
export const UserControllers = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUser,
};
