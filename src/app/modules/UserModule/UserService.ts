import { Orders, User } from './UserInterface';
import { UserModel } from './Usermodel';

// create user
const createUserIntoDB = async (user: User) => {
  const res = await UserModel.create(user);
  const {
    userId,
    username,
    fullName,
    age,
    email,
    isActive,
    hobbies,
    address,
    orders,
  } = res;
  const res_order = {
    userId,
    username,
    fullName,
    age,
    email,
    isActive,
    hobbies,
    address,
    orders,
  };
  const res_without_order = {
    userId,
    username,
    fullName,
    age,
    email,
    isActive,
    hobbies,
    address,
  };
  const result = orders && orders?.length > 0 ? res_order : res_without_order;
  console.log('result', result);
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

const storeOrdersInDB = async (userId: number, orderData: Orders[]) => {
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
  console.log('orderData: ', orderData);

  const isOrdersArray = await UserModel.areOrdersPresent(userId);
  console.log(isOrdersArray);
  if (isOrdersArray) {
    const result = await UserModel.updateOne(
      { userId },
      {
        $push: {
          orders: {
            $each: [...orderData],
          },
        },
      },
    );
    console.log(result);
    return result;
  } else {
    const result = await UserModel.updateOne(
      { userId },
      {
        $addToSet: {
          orders: {
            $each: [...orderData],
          },
        },
      },
    );
    console.log(result);
    return result;
  }
};

// get orders of a user by id
const getOrdersByIdFromDB = async (userId: number) => {
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
    orders: 1,
  });
  return result;
};

// calculate the total price/cost of the order
const getTotalPriceValue = async (userId: number) => {
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
  storeOrdersInDB,
  getOrdersByIdFromDB,
  getTotalPriceValue,
};
