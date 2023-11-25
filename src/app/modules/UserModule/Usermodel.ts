import { Schema, model } from 'mongoose';
import { Address, FullName, Orders, User, IUserModel } from './UserInterface';
import bcrypt from 'bcrypt';
import config from '../../config';
const FullNameSchema = new Schema<FullName>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },

  lastName: {
    type: String,
    required: true,
    trim: true,
  },
});

const OrdersSchema = new Schema<Orders>({
  productName: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const AddressSchema = new Schema<Address>({
  street: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
});

const UserSchema = new Schema<User, IUserModel>({
  userId: {
    type: Number,
    required: true,
    message: 'User ID is required',
    unique: true,
  },
  username: {
    type: String,
    required: true,
    message: 'Username is required',
  },
  password: {
    type: String,
    required: true,
    message: 'Password is required',
    minlength: [6, 'Password should be at least 6 characters'],
    maxlength: [20, 'Password cannot be more than 20 characters'],
  },
  fullName: {
    type: FullNameSchema,
    required: true,
    message: 'FullName with first name and last name is required',
  },
  age: { type: Number, required: true, message: 'Age is required' },
  email: { type: String, required: true, message: 'Email is required' },
  isActive: {
    type: Boolean,
    required: true,
    message: 'Active Status is required',
  },
  hobbies: { type: [String], required: true, message: 'Hobbies are required' },
  address: {
    type: AddressSchema,
    required: true,
    message: 'Address is required',
  },
  orders: {
    type: [OrdersSchema],
    required: true,
    message: 'Orders are required',
  },
});

// hashing the password

UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const dbuser = this;
  dbuser.password = await bcrypt.hash(
    dbuser.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// using post middleware to remove the password from the response
UserSchema.post('save', async function (doc, next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  doc.password = '';
  next();
});

// creating static method to check User

UserSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await UserModel.findOne({ userId: userId });
  return existingUser;
};

UserSchema.statics.areOrdersPresent = async function (userId: number) {
  const data = await UserModel.findOne({ userId: userId }).select({
    orders: 1,
  });
  let isOrder;
  if (data && data.orders) {
    isOrder = data.orders.length > 0 ? true : false;
  }

  return isOrder;
};
export const UserModel = model<User, IUserModel>('User', UserSchema);
