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
    const { name, description, duration, fee, schedules } = req.body;

      // const image = handleFileUpload(req.files.image, "courses");

    // Parse `schedules` if it's a string
    if (typeof schedules === 'string') {
      schedules = JSON.parse(schedules);
    }

    // Create the new course document
    const newCourse = new Course({
      name,
      // image,
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

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
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
        limitNumber,
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
      return res.status(404).json({ message: "Course not found" });
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
    const { name, description, duration, fee, schedules } = req.body;

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    if (req.files && req.files.image) {
      const newImage = handleFileUpload(req.files.image, "courses");
      if (course.image) fs.unlinkSync(course.image); // Delete old image
      course.image = newImage;
    }

     // Parse `schedules` if it's a string
     if (typeof schedules === 'string') {
      course.schedules  = schedules ? JSON.parse(schedules) : course.schedules;
    }
    course.name = name || course.name;
    course.description = description || course.description;
    course.duration = duration || course.duration;
    course.fee = fee || course.fee;
    // course.schedules = schedules ? JSON.parse(schedules) : course.schedules; // Update schedules

    await course.save();
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message});
  }
};

// Delete Course
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    if (course.image) fs.unlinkSync(course.image); // Delete the course image

    res.status(200).json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};