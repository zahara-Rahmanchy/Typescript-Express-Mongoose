import express from 'express';
import { UserControllers } from './UserController';
const router = express.Router();

// post route to create and store user
router.post('/users', UserControllers.createUser);
router.get('/users', UserControllers.getAllUsers);
router.get('/users/:userId', UserControllers.getUserById);
export const UserRoutes = router;
