import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './src/config/dbConnect.js';
import roleRoute from './src/routes/roleRoute.js';
import authRouter from './src/routes/authRoute.js';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import courseRoute from './src/routes/courseRoute.js';
import appointmentRoute from './src/routes/appointmentRoute.js';
import staffRoute from './src/routes/staffRoute.js';
import userRoute from './src/routes/userRoute.js';
import studentRoute from './src/routes/studentRoute.js';

dotenv.config();

dbConnect();

const app = express();
const port = process.env.PORT;

// Middleware to parse cookies
app.use(cookieParser());  // Add this line before any routes
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(fileUpload()); // Handle file uploads
app.use("/uploads", express.static("uploads")); // Serve uploaded files as static

//routes
app.use('/api', authRouter);
app.use('/api/roles', roleRoute);
app.use('/api/staffs', staffRoute);
app.use('/api/users', userRoute);
app.use('/api/students', studentRoute);
app.use("/api/courses", courseRoute);
app.use("/api/appointments", appointmentRoute);

app.listen(port, () => { 
    console.log(`Server is running on port: ${port}`);
});
