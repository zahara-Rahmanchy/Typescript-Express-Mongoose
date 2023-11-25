import Joi from 'joi';

const FullNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .max(15)
    .regex(/^[A-Z][a-z]*$/, { name: 'capitalize' })
    .message('First name must start with a capital letter'),
  lastName: Joi.string().required().trim(),
});

const OrdersValidationSchema = Joi.object({
  productName: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
});

const AddressValidationSchema = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
});

export const UserValidationSchema = Joi.object({
  userId: Joi.number().required(),
  username: Joi.string().required(),
  password: Joi.string().required().min(6).max(20),
  fullName: FullNameValidationSchema.required(),
  age: Joi.number().required(),
  email: Joi.string().required().email(),
  isActive: Joi.boolean().required(),
  hobbies: Joi.array().items(Joi.string()).required(),
  address: AddressValidationSchema.required(),
  orders: Joi.array().items(OrdersValidationSchema).required(),
});
