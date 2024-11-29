import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import { authorizeRole } from '../middleware/roleMiddleware.js';
import { createStaff, deleteStaff, getStaff, getStaffs, getStaffsByRole, updatestaff } from '../controller/staffController.js';


const staffRoute = express.Router();

// Route to create a new Satff
staffRoute.post(
  '/',
  verifyToken,
  authorizeRole('Manager'),
  createStaff
);

// Route to get all Satffs
staffRoute.get(
  '/',
  verifyToken,
  authorizeRole('Manager'),
  getStaffs
);
staffRoute.get(
  '/:role',
  verifyToken,
  authorizeRole('Manager'),
  getStaffsByRole
);
staffRoute.get(
  '/:id',
  verifyToken,
  authorizeRole('Manager'),
  getStaff
);

// Route to update a Satff
staffRoute.patch(
  '/:id',
  verifyToken,
  authorizeRole('Manager'),
  updatestaff
);

// Route to delete a Satff
staffRoute.delete(
  '/:id',
  verifyToken,
  authorizeRole('Manager'),
  deleteStaff
);

export default staffRoute;
