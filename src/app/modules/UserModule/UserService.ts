import { User } from './UserInterface';
import { UserModel } from './Usermodel';

const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

export const UserServices = {
  createUserIntoDB,
};
