import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const { Schema, model } = mongoose;

// Define the base schema for user
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      minlength: 4, // Set a minimum length for the password
    },
    passwordConfirmation: {
      type: String,
      required: true,
    },
    phone: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
    isStudent: { type: Boolean, default: false }, // Indicates if user is a student
  },
  { timestamps: true }
);

// Pre-save middleware to hash the password and check for confirmation
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    // Check if password and confirmation match
    if (this.password !== this.passwordConfirmation) {
      throw new Error("Passwords do not match");
    }

    // Hash the password before saving
    this.password = await bcrypt.hash(this.password, 10);
    this.passwordConfirmation = undefined; // Remove passwordConfirmation after hashing
  }
  next();
});

// Method to compare entered password with hashed password
userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Create the user model
const User = model("User", userSchema);

export default User;
