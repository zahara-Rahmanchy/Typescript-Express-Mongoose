import { User } from './UserInterface';
import { UserModel } from './Usermodel';

const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};
const getAllUserFromDB = async () => {
  const result = await UserModel.find({}).select({
    _id: 0,
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });
  return result;
};

const getUserByIdFromDB = async (userId: number) => {
  const userExist = await UserModel.isUserExists(userId);
  if (!userExist) {
    throw new Error(
      JSON.stringify({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      }),
    );
  }
  const result = await UserModel.findOne({ userId: userId }).select({
    _id: 0,
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

const updateUserInDB = async (userId: number, userdata: User) => {
  const userExist = await UserModel.isUserExists(userId);
  if (!userExist) {
    throw new Error(
      JSON.stringify({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      }),
    );
  }
  const result = await UserModel.findOneAndUpdate({ userId }, userdata, {
    new: true,
    projection: { _id: 0, password: 0 },
  });
  console.log(userdata);
  return result;
};

const deleteUserFromDb = async (userId: number) => {
  const userExist = await UserModel.isUserExists(userId);
  if (!userExist) {
    throw new Error(
      JSON.stringify({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      }),
    );
  }
  const result = await UserModel.deleteOne({ userId });

  return result;
};
export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getUserByIdFromDB,
  updateUserInDB,
  deleteUserFromDb,
};
