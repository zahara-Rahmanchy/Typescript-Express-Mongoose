import { Request, Response } from 'express';
import { UserServices } from './UserService';

const createUser = async (req: Request, res: Response) => {
  const user = req.body.User;
  //   console.log(user);

  const result = await UserServices.createUserIntoDB(user);
  res.status(200).json({
    success: true,
    message: 'User is created Successfully',
    data: result,
  });
};

export const UserControllers = {
  createUser,
};
