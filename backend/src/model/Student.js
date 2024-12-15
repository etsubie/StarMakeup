import mongoose from "mongoose";
const { Schema, model } = mongoose;

const emergencyContactSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
});

const studentSchema = new Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    address: { type: String, required: true },
    subcity: { type: String, required: true },
    woreda: { type: String, required: true },
    education: { type: String, required: true },
    emergencyContact: { type: emergencyContactSchema, required: true },
  },
  { timestamps: true }
);

export const Student = model("Student", studentSchema);
