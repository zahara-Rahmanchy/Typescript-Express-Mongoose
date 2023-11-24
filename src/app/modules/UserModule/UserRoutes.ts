import express from 'express';
import { UserControllers } from './UserController';
const router = express.Router();

// post route to create and store user
router.post('/create-user', UserControllers.createUser);
router.get('/', UserControllers.getAllUsers);
router.get('/:userId', UserControllers.getUserById);
router.put('/:userId', UserControllers.updateUserById);
router.delete('/:userId', UserControllers.deleteUser);
export const UserRoutes = router;
