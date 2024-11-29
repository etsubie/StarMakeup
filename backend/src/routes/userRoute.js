import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import { authorizeRole } from '../middleware/roleMiddleware.js';
import {  deleteUser, getUser, getUsers, registerUser, updateUser} from '../controller/userController.js';


const userRoute = express.Router();

// Route to create a new user
userRoute.post(
  '/register-user',
  verifyToken,
  authorizeRole('Manager'),
  registerUser
);
// Route to get all users
userRoute.get(
  '/',
  verifyToken,
  authorizeRole('Manager'),
  getUsers
);

userRoute.get(
  '/:id',
  verifyToken,
  getUser
);

// Route to update a user
userRoute.patch(
  '/:id',
  verifyToken,
  updateUser
);

// Route to delete a user
userRoute.delete(
  '/:id',
  verifyToken,
  deleteUser
);

export default userRoute;
