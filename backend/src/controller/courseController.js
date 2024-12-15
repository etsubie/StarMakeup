import path from "path";
import fs from "fs";
import { Course } from "../model/Course.js";

// Utility to handle file uploads
const handleFileUpload = (file, folder) => {
  const uploadPath = path.join("uploads", folder);

  // Ensure upload directory exists
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(uploadPath, fileName);

  file.mv(filePath); // Move file to the specified directory
  return `/uploads/${folder}/${fileName}`; // Return relative path for storing in DB
};

// Create Course
export const createCourse = async (req, res) => {
  try {
    let { name, description, duration, fee, schedules } = req.body;

    // Handle file upload if image is provided
    let image = null;
    if (req.files && req.files.image) {
      image = handleFileUpload(req.files.image, "courses");
    }

    // Parse `schedules` if it's a string
    if (typeof schedules === "string") {
      schedules = JSON.parse(schedules);
    }

    // Create the new course document
    const newCourse = new Course({
      name,
      image,
      description,
      duration,
      fee,
      schedules,
    });

    await newCourse.save();
    res.status(201).json({ success: true, data: newCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Courses
export const getCourses = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const courses = await Course.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);

    const totalCourses = await Course.countDocuments();

    res.status(200).json({
      success: true,
      data: courses,
      pagination: {
        currentPage: pageNumber,
        totalPages: Math.ceil(totalCourses / limitNumber),
        totalCourses,
        limit: limitNumber,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Course by ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Course
export const updateCourse = async (req, res) => {
  try {
    let { name, description, duration, fee, schedules } = req.body;

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // Handle file upload if a new image is provided
    if (req.files && req.files.image) {
      const newImage = handleFileUpload(req.files.image, "courses");
      if (course.image) {
        try {
          fs.unlinkSync(course.image); // Delete old image
        } catch (err) {
          console.error(`Failed to delete image: ${err.message}`);
        }
      }
      course.image = newImage;
    }

    // Parse `schedules` if it's a string
    if (typeof schedules === "string") {
      schedules = schedules ? JSON.parse(schedules) : course.schedules;
    }

    // Update course fields
    course.name = name || course.name;
    course.description = description || course.description;
    course.duration = duration || course.duration;
    course.fee = fee || course.fee;
    course.schedules = schedules || course.schedules;

    await course.save();
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Course
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    // Check if the course exists
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found. There is no course with the provided ID.",
      });
    }

    // Delete the associated image if it exists
    if (course.image) {
      try {
        fs.unlinkSync(course.image);
      } catch (err) {
        console.error(`Failed to delete image: ${err.message}`);
      }
    }

    res.status(200).json({
      success: true,
      message: "Course deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the course.",
    });
  }
};

