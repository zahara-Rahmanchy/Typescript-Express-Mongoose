import express from 'express';
import { UserControllers } from './UserController';
const router = express.Router();

// post route to create and store user
router.post('/', UserControllers.createUser);

// get route to get user data
router.get('/', UserControllers.getAllUsers);

// get route to get user data by user id
router.get('/:userId', UserControllers.getUserById);

// update route to update user data using user id
router.put('/:userId', UserControllers.updateUserById);

// delete route to delete user data using user id
router.delete('/:userId', UserControllers.deleteUser);

// get orders of specific user
router.get('/:userId/orders', UserControllers.getOrdersById);

// get total const/price
router.get('/:userId/orders/total-price', UserControllers.getTotalPrice);
//
export const UserRoutes = router;
