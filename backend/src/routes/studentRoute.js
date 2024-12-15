import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import { authorizeRole } from "../middleware/roleMiddleware.js";
import {
  deleteStudentById,
  getAllStudents,
  getStudentById,
  registerStudent,
  registerStudentWithCourse,
  updateStudentById,
} from "../controller/studentcontroller.js";

const studentRoute = express.Router();

// Route to create a new student
studentRoute.post(
  "/:courseId/register",
  registerStudentWithCourse
);

// Route to create a new student
studentRoute.post(
  "/:courseId/register-student",
  verifyToken,
  authorizeRole("Manager", "Registrar"),
  registerStudent
);

// Route to get all students
studentRoute.get(
  "/",
  verifyToken,
  authorizeRole("Registrar", "Manager"),
  getAllStudents
);

studentRoute.get(
  "/:id",
  verifyToken,
  authorizeRole("Registrar", "Manager", "Customer", "Student"),
  getStudentById
);

// Route to update a student
studentRoute.patch(
  "/:id",
  verifyToken,
  authorizeRole("Registrar", "Manager"),
  updateStudentById
);

// Route to delete a student
studentRoute.delete(
  "/:id",
  verifyToken,
  authorizeRole("Registrar", "Manager"),
  deleteStudentById
);

export default studentRoute;
