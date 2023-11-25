import { User } from './UserInterface';
import { UserModel } from './Usermodel';

// create user
const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

// get users
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

// get user by id
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

// update user
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

// delete user
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

// const storeOrdersInDB =async (userId: number,orderData:Orders) => {
//   const userExist = await UserModel.isUserExists(userId);
//   if (!userExist) {
//     throw new Error(
//       JSON.stringify({
//         success: false,
//         message: 'User not found',
//         error: {
//           code: 404,
//           description: 'User not found!',
//         },
//       }),
//     );
//   }

// }

// get orders of a user by id
const getOrdersByIdFromDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId: userId }).select({
    _id: 0,
    orders: 1,
  });
  return result;
};

// calculate the total price/cost of the order
const getTotalPriceValue = async (userId: number) => {
  const result = await UserModel.findOne({ userId: userId }).select({
    _id: 0,
    orders: 1,
  });

  // console.log(orders);
  let totalPrice = 0;
  // eslint-disable-next-line no-unsafe-optional-chaining
  if (result && result.orders) {
    for (const order of result.orders) {
      totalPrice += order.price * order.quantity;
    }
  }
  return totalPrice;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getUserByIdFromDB,
  updateUserInDB,
  deleteUserFromDb,
  getOrdersByIdFromDB,
  getTotalPriceValue,
};
