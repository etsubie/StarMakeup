import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const { Schema, model } = mongoose;

// Define the base schema for staff
const staffSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
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
  },
  { timestamps: true }
);

// Pre-save middleware to hash the password and check for confirmation
staffSchema.pre("save", async function (next) {
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
staffSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Create the staff model
const Staff = model("Staff", staffSchema);

export default Staff;
