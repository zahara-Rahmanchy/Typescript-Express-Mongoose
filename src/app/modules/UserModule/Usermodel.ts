import { Schema, model } from 'mongoose';
import { Address, FullName, Orders, User } from './UserInterface';

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

const UserSchema = new Schema<User>({
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
    unique: true,
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

export const UserModel = model<User>('User', UserSchema);
