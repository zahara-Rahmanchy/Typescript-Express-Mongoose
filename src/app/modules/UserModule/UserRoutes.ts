import express from 'express';
import { UserControllers } from './UserController';
const router = express.Router();

// post route to create and store user
router.post('/users', UserControllers.createUser);

export const UserRoutes = router;
