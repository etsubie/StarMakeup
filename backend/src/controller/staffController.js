import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import Role from "../model/Role.js";
import Staff from "../model/Staff.js";

// Create a new staff
export const createStaff = async (req, res) => {
  const {
    name,
    phone,
    username,
    password,
    roleName,
    passwordConfirmation,
  } = req.body;

  try {
    // Check if the staff with the same username already exists
    const existingstaff = await Staff.findOne({ username });
    if (existingstaff) {
      return res
        .status(400)
        .json({ success: false, message: "staff username already exists" });
    }

    // Find the role by name
    const role = await Role.findOne({ name: roleName });
    if (!role) {
      return res
        .status(400)
        .json({ success: false, message: `Role '${roleName}' not found` });
    }

    const staffData = {
      phone,
      name,
      username,
      password,
      passwordConfirmation,
      role: role._id,
    };

    // Create the new staff
    const newstaff = new Staff(staffData);
    await newstaff.save();

    return res
      .status(201)
      .json({
        success: true,
        message: "staff created successfully",
        staff: newstaff,
      });
  } catch (error) {
    console.error("Error creating staff:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get all staffs sorted from latest to oldest with pagination
export const getStaffs = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default page is 1, limit is 10

    // Convert page and limit to numbers
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Calculate the skip value for pagination
    const skip = (pageNumber - 1) * limitNumber;

    // Get total number of staffs to calculate the total pages
    const totalstaffs = await Staff.countDocuments();

    // Fetch staffs with pagination
    const staffs = await Staff.find()
      .populate("role", "name") // Populate role details
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
      .skip(skip)
      .limit(limitNumber); // Apply limit for pagination

    return res.status(200).json({
      staffs,
      totalstaffs,
      totalPages: Math.ceil(totalstaffs / limitNumber), // Calculate total pages
      currentPage: pageNumber,
    });
  } catch (error) {
    console.error("Error fetching staffs:", error);
    return res.status(500).json({ message: error.message });
  }
};

//get staffs by role
export const getStaffsByRole = async (req, res) => {
  try {
    const { role } = req.params;
    const rolename= Role.findOne(role.name)
    const validRoles = [
rolename.lowercase    ];

    // Validate role
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role specified." });
    }
    const { page = 1, limit = 10 } = req.query; // Default page is 1, limit is 10

    // Convert page and limit to numbers
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Calculate the skip value for pagination
    const skip = (pageNumber - 1) * limitNumber;

    // Query staffs with the specified role subdocument
    const query = {};
    query[role] = { $exists: true, $ne: null }; // Ensure the subdocument exists and is not null

    const staffs = await Staff.find(query)
      .populate("role", "name")
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
      .skip(skip)
      .limit(limitNumber); // Apply limit for pagination
    // Get total number of staffs to calculate the total pages
    const totalstaffs = await Staff.countDocuments(query);

    return res.status(200).json({
      staffs,
      totalstaffs,
      totalPages: Math.ceil(totalstaffs / limitNumber), // Calculate total pages
      currentPage: pageNumber,
    });
  } catch (error) {
    console.error("Error fetching staffs:", error);
    return res.status(500).json({ message: error.message });
  }
};
// Get a single staff by ID
export const getStaff = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid ID format" });
  }

  try {
    const staff = await Staff.findById(id).populate("role", "name");
    if (!staff) {
      return res
        .status(404)
        .json({ success: false, message: "staff not found" });
    }

    return res.status(200).json({ success: true, data: staff });
  } catch (error) {
    console.error("Error fetching staff:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update a staff
export const updatestaff = async (req, res) => {
  const { id } = req.params;
  const { name, username, password, phone, roleName } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid ID format" });
  }

  try {
    // Check if staff exists
    const existingstaff = await Staff.findById(id);
    if (!existingstaff) {
      return res
        .status(404)
        .json({ success: false, message: "staff not found" });
    }

    const updateData = {};

    // Update name if provided
    if (name) updateData.name = name;

    if (phone) updateData.phone = phone;

    // Update username if provided
    if (username) {
      const existingusername = await Staff.findOne({ username });
      if (existingusername && existingusername._id.toString() !== id) {
        return res
          .status(400)
          .json({ success: false, message: "username already exists" });
      }
      updateData.username = username;
    }

    // Hash and update password if provided
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Validate and update role if provided
    if (roleName) {
      const role = await Role.findOne({ name: roleName });
      if (!role) {
        return res
          .status(400)
          .json({ success: false, message: `Role '${roleName}' not found` });
      }
      updateData.role = role._id;
    }

    // Update the staff document
    const updatedstaff = await Staff.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate("role");

    return res
      .status(200)
      .json({
        success: true,
        message: "staff updated successfully",
        staff: updatedstaff,
      });
  } catch (error) {
    console.error("Error updating staff:", error);
    return res
      .status(500)
      .json({ success: false, message: error.message });
  }
};

// Delete a staff
export const deleteStaff = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid ID format" });
  }

  try {
    const deletedstaff = await Staff.findByIdAndDelete(id);
    if (!deletedstaff) {
      return res
        .status(404)
        .json({ success: false, message: "staff not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "staff deleted successfully" });
  } catch (error) {
    console.error("Error deleting staff:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
