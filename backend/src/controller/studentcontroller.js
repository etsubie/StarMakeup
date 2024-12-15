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
    email,
  } = req.body;
  const { courseId } = req.params;

  try { 
    // Validate course existence
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if the student already exists by email
    let student = await Student.findOne({ email });
    if (!student) {
      // Create the student if not already registered
      student = await Student.create({
        email,
        name,
        age,
        gender,
        address,
        subcity,
        woreda,
        education,
        emergencyContact,
      });
    }

    // Check for existing active enrollment in the course
    const existingEnrollment = await Enrollment.findOne({
      student: student._id,
      course: courseId,
      status: "active",
    });
    if (existingEnrollment) {
      return res
        .status(400)
        .json({ message: "You are already enrolled in this course" });
    }

    // Enroll the student in the course
    await Enrollment.create({
      student: student._id,
      course: courseId,
      status: "active",
    });

    return res.status(201).json({
      message: "Student registered successfully",
      student,
    });
  } catch (error) {
    console.error("Error registering student with course:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Register student via registrar or manager
export const registerStudent = async (req, res) => {
  const {
    name,
    email,
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

    
    // Create or retrieve student profile
    let student = await Student.findOne({ email });

    if (!student) {
      student = await Student.create({
        name,
        email,
        age,
        gender,
        address,
        subcity,
        woreda,
        education,
        emergencyContact,
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
    // Validate and sanitize query parameters
    const pageNumber = Math.max(1, parseInt(page, 10) || 1);
    const limitNumber = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));
    const skip = (pageNumber - 1) * limitNumber;

    // Fetch students with pagination and populate relevant fields
    const students = await Enrollment.find()
      .populate("student", "name age gender address subcity woreda") // Specific fields for efficiency
      .populate("course", "name duration") // Specific fields for courses
      .sort({ createdAt: -1 }) // Sort by latest
      .skip(skip) // Skip documents for pagination
      .limit(limitNumber); // Apply limit for pagination

    // Check if no students found
    if (!students.length) {
      return res
        .status(404)
        .json({ success: false, message: "No students found" });
    }

    // Get total count of enrolled students
    const totalStudents = await Enrollment.countDocuments();

    // Return response with students and pagination info
    return res.status(200).json({
      success: true,
      data: students,
      pagination: {
        currentPage: pageNumber,
        totalPages: Math.ceil(totalStudents / limitNumber),
        totalStudents,
      },
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error fetching students", error });
  }
};

// Get student by ID
export const getStudentById = async (req, res) => {
  try {
    const student = await Enrollment.findById(req.params.id)
      .populate("student") // Specific fields for efficiency
      .populate("course", "name duration"); // Specific fields for courses

    if (!student) return res.status(404).json({ message: "Student not found" });

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update student by ID
export const updateStudentById = async (req, res) => {
  let {
    name,
    age,
    gender,
    description,
    address,
    subcity,
    woreda,
    education,
    emergencyContact,
    email,
  } = req.body;

  try {
    const stud = await Enrollment.findById(req.params.id);
    if (!stud) {
      return res
        .status(404)
        .json({ success: false, message: "student not found" });
    }
    let student = await Student.findOne({ email});

    // Update fields
    student.name = name || student.name;
    student.description = description || student.description;
    student.age = age || student.age;
    student.gender = gender || student.gender;
    student.address = address || student.address;
    student.subcity = subcity || student.subcity;
    student.woreda = woreda || student.woreda;
    student.education = education || student.education;
    student.address = address || student.address;
    student.emergencyContact = emergencyContact || student.emergencyContact;

    await student.save();
    res
      .status(200)
      .json({
        success: true,
        message: "Student updated successfully",
        data: student,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete student by ID
export const deleteStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    // Delete related enrollments
    await Enrollment.deleteMany({ student: studentId });

    // Remove student and update user
    await student.deleteOne();

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
