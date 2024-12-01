import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../model/User.js";
import Role from "../../model/Role.js";

export const register = async (req, res) => {
  const { name, email, password, passwordConfirmation, phone } =
    req.body;

  try {
    // Check if User with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Fetch the 'Customer' role
    const roleData = await Role.findOne({ name: "Customer" });
    if (!roleData) {
      return res
        .status(400)
        .json({ message: "Default role 'Customer' not found" });
    }

    // Prepare base user data
    const userData = {
      phone,
      name,
      email,
      password,
      passwordConfirmation,
      role: roleData._id, // Store the Role _id reference
    };

    // Create and save the new user
    const user = new User(userData);
    await user.save();

    res.status(201).json({ message: "Successfully registered", user });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Login a user
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email }).populate("role");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("user", user);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("User Role Login:", user.role.name);

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email, },
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
export const logout = (req, res) => {
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
