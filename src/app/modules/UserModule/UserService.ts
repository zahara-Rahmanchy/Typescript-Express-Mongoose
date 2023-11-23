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
export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
};
