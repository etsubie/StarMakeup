import cron from "node-cron";
import { Enrollment } from "../model/Enrollement.js";
import { Student } from "../model/Student.js";
import User from "../model/User.js";

cron.schedule("0 0 * * *", async () => { // Runs every day at midnight
  const today = new Date();

  try {
    // Find enrollments where payment status is "unpaid" for more than a specific period
    const unpaidThreshold = 15; // Number of days allowed without payment
    const unpaidEnrollments = await Enrollment.find({
      paymentStatus: "unpaid",
      enrollmentDate: { $lte: new Date(today.getTime() - unpaidThreshold * 24 * 60 * 60 * 1000) },
    });

    for (const enrollment of unpaidEnrollments) {
      const studentId = enrollment.student;

      // First, find the student to ensure it exists
      const student = await Student.findById(studentId);
      if (student) {
        // Remove the student record
        await Student.findByIdAndDelete(studentId);

        // Remove the enrollment record
        await Enrollment.findByIdAndDelete(enrollment._id);

        // Update user
        await User.updateOne({ _id: student.user }, { $set: { isStudent: false } });

        console.log(`Deleted student ${studentId} and their enrollment for unpaid status.`);
      } else {
        console.log(`Student with ID ${studentId} not found, skipping.`);
      }
    }
  } catch (error) {
    console.error("Error in cleaning up unpaid students:", error);
  }
});
