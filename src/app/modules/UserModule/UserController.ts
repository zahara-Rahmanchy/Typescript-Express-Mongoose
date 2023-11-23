import { Request, Response } from 'express';
import { UserServices } from './UserService';

const createUser = async (req: Request, res: Response) => {
  const user = req.body.User;
  //   console.log(user);

  const result = await UserServices.createUserIntoDB(user);
  res.status(200).json({
    success: true,
    message: 'User created successfully!',
    data: result,
  });
};

const getAllUsers = async (req: Request, res: Response) => {
  const result = await UserServices.getAllUserFromDB();
  res.status(200).json({
    success: true,
    message: 'Users fetched successfully!',
    data: result,
  });
};

const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await UserServices.getUserByIdFromDB(Number(userId));
  res.status(200).json({
    success: true,
    message: '"User fetched successfully!',
    data: result,
  });
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getUserById,
};
