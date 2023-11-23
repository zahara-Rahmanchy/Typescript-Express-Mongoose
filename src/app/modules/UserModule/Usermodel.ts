import { Schema, model } from 'mongoose';
import { Address, FullName, Orders, User } from './UserInterface';

const FullNameSchema = new Schema<FullName>({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
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
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const UserSchema = new Schema<User>({
  userId: { type: Number },
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullname: FullNameSchema,
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean },
  hobbies: [String],

  address: AddressSchema,
  orders: [OrdersSchema],
});

export const UserModel = model<User>('User', UserSchema);
