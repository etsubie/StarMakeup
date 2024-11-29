import { Course } from "../model/Course.js";
import { Enrollment } from "../model/Enrollement.js";
import { Student } from "../model/Student.js";
import User from "../model/User.js";


// Self-register a student with a course
export const registerStudentWithCourse = async (req, res) => {
  const {
    name,
    age,
    gender,
    address,
    subcity,
    woreda,
    education,
    emergencyContact,
  } = req.body;
  const { courseId } = req.params;

  try {
    // Validate course existence
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Validate user existence
    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check for existing active enrollment
    const existingEnrollment = await Enrollment.findOne({
      student: user._id,
      course: courseId,
      status: "active",
    });
    if (existingEnrollment) {
      return res
        .status(400)
        .json({ message: "You are already enrolled in this course" });
    }

    // Create or retrieve student profile
    let student = await Student.findOne({ user: user._id });
    if (!student) {
      student = await Student.create({
        name,
        age,
        gender,
        address,
        subcity,
        woreda,
        education,
        emergencyContact,
        user: user._id,
      });
    }

    // Mark user as a student
    user.isStudent = true;
    await user.save();

    // Enroll student in the course
    const enrollment = await Enrollment.create({
      student: student._id,
      course: courseId,
      status: "active",
    });

    res.status(201).json({
      message: "Student registered successfully",
      student,
      course,
      enrollment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Register student via registrar or manager
export const registerStudent = async (req, res) => {
  const {
    name,
    age,
    gender,
    address,
    subcity,
    woreda,
    education,
    emergencyContact,
    email,
  } = req.body;
  const { courseId } = req.params;

  try {
    // Validate course existence
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Validate user existence
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User account does not exist. Please create the user first." });
    }

    // Mark user as a student if necessary
      user.isStudent = true;
      await user.save();

    // Create or retrieve student profile
    let student = await Student.findOne({ user: user._id });
    if (!student) {
      student = await Student.create({
        name,
        age,
        gender,
        address,
        subcity,
        woreda,
        education,
        emergencyContact,
        user: user._id,
      });
    }

    // Check for existing active enrollment
    const existingEnrollment = await Enrollment.findOne({
      student: student._id,
      course: courseId,
      status: "active",
    });
    if (existingEnrollment) {
      return res
        .status(400)
        .json({ message: "The student is already enrolled in this course" });
    }

    // Enroll student in the course
    const enrollment = await Enrollment.create({
      student: student._id,
      course: courseId,
      status: "active",
    });

    res.status(201).json({
      message: "Student registered successfully",
      student,
      course,
      enrollment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all students
export const getAllStudents = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const students = await Student.find()
      .populate("user", "email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);

    if (!students.length) {
      return res.status(404).json({ message: "No students found" });
    }

    const totalStudents = await Student.countDocuments();

    res.status(200).json({
      success: true,
      data: students,
      pagination: {
        currentPage: pageNumber,
        totalPages: Math.ceil(totalStudents / limitNumber),
        totalStudents,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get student by ID
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate("user", "email");
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update student by ID
export const updateStudentById = async (req, res) => {
  const updates = req.body;

  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!student) return res.status(404).json({ message: "Student not found" });

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: student,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete student by ID
export const deleteStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    // Delete related enrollments
    await Enrollment.deleteMany({ student: student._id });

    // Remove student and update user
    await student.deleteOne();
    await User.updateOne({ _id: student.user }, { $set: { isStudent: false } });

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
