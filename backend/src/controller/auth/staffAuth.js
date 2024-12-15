import Staff from "../../model/Staff.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

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
// Login a user
export const loginSatff = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const user = await Staff.findOne({ username}).populate("role");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  console.log("user", user)
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      console.log("User Role Login:", user.role.name);
  
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION } // Token expiration time
      );
  
      // Set token in HTTP-only cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use true in production
        sameSite: "strict", // Prevent CSRF attacks
        maxAge: process.env.COOKIE_MAX_AGE, // 1 hour in milliseconds
      });
  
      res.status(200).json({ token: token, message: "Logged in successfully" });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ message: error.message });
    }
  };
  
  // Logout a user
  export const logoutStaff = (req, res) => {
    try {
      // Clear the token from the cookies
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Match the secure setting used during login
        sameSite: "strict",
      });
  
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.error("Logout Error:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  