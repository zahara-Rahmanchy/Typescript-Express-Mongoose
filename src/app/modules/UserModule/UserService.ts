import { User } from './UserInterface';
import { UserModel } from './Usermodel';

const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};
const getAllUserFromDB = async () => {
  const result = await UserModel.find({}).select({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });
  return result;
};

const getUserByIdFromDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId: userId }).select({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    isActive: 1,
    hobbies: 1,
    address: 1,
  });
  return result;
};
export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getUserByIdFromDB,
};
