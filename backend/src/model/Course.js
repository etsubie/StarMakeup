import mongoose from 'mongoose';

const { Schema, model } = mongoose;

export const scheduleSchema = new Schema({
  type: {
    type: [String], // Array of types
    required: true,
  },
  // startTime: {
  //   type: String,
  //   required: true,
  // },
  // endTime: {
  //   type: String,
  //   required: true,
  // },
});

const courseSchema = new Schema(
  {
    // image: { type: String, required: true }, // Path to the uploaded image
    name: { type: String, required: true },
    description: { type: String },
    duration: { type: Number, required: true }, // e.g., weeks or months
    fee: { type: Number, required: true },
    schedules: [scheduleSchema], // Array of schedule
  },
  { timestamps: true }
);

export const Course = model('Course', courseSchema);
