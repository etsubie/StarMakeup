import mongoose from "mongoose";
const { Schema, model } = mongoose;

const enrollmentSchema = new Schema(
  {
    student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    enrollmentDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["active", "completed", "withdrawn", "pending"],
      default: "active",
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid", "partially_paid"],
      default: "unpaid",
    },
  },
  { timestamps: true }
);

export const Enrollment = model("Enrollment", enrollmentSchema);
