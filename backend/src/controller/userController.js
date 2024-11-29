import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Role from "../model/Role.js";
import User from "../model/User.js";

// Register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, passwordConfirmation, phone } = req.body;

    if (password !== passwordConfirmation) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }

    const role = await Role.findOne({ name: "Customer" });
    if (!role) {
      return res
        .status(400)
        .json({ success: false, message: "Role 'Customer' not found" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      role: role._id,
    });

    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser.email,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch users with pagination
export const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const totalUsers = await User.countDocuments({ isStudent: false });
    const users = await User.find({ isStudent: false })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);

    if (!users.length) {
      return res
        .status(404)
        .json({ success: false, message: "No users found" });
    }

    return res.status(200).json({
      success: true,
      users,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limitNumber),
      currentPage: pageNumber,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single user by ID
export const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid ID format" });
  }

  try {
    const user = await User.findById(id).populate("role", "name");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, password, phone, roleName } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid ID format" });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const updateData = { name, phone };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    if (roleName) {
      const role = await Role.findOne({ name: roleName });
      if (!role) {
        return res
          .status(400)
          .json({ success: false, message: `Role '${roleName}' not found` });
      }
      updateData.role = role._id;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate("role", "name");

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid ID format" });
  }

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
