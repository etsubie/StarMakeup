import Chapa from "chapa"
import { Payment } from "../model/Payment.js";
import { Enrollment } from "../model/Enrollement.js";
import { Course } from "../model/Course.js";

const chapa = new Chapa(process.env.CHAPA_SECRET_KEY );

export const initializePayment = async (req, res) => {
    const { enrollmentId, amount, method, email, firstName, lastName } = req.body;
  
    try {
      // Validate request body
      if (!enrollmentId || !amount || !method || !email || !firstName || !lastName) {
        return res.status(400).json({  
          success: false,
          message: "Missing required fields: enrollmentId, amount, method, email, firstName, lastName.",
        });
      }
  
      // Generate transaction reference
      const tx_ref = `tx_${Date.now()}`;
      const callback_url = `${process.env.CLIENT_URL}/payment-success`;
  
      // Initialize payment with Chapa
      const chapaResponse = await chapa.initialize({
        amount,
        currency: "ETB",
        email,
        first_name: firstName,
        last_name: lastName,
        tx_ref,
        callback_url,
      });
  
      if (!chapaResponse?.data?.checkout_url) {
        throw new Error("Failed to initialize payment with Chapa.");
      }
      console.log(chapaResponse)
  
      // Respond with the checkout URL and enrollmentId for redirection
      res.status(201).json({
        success: true,
        tx_ref,
        enrollmentId,
        checkout_url: chapaResponse.data.checkout_url,
      });
    } catch (error) {
      console.error("Payment Initialization Error:", error.message);
      res.status(500).json({
        success: false,
        message: "Payment initialization failed.",
        error: error.message,
      });
    }
  };


// import axios from "axios";

// const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY;
// const CHAPA_BASE_URL = "https://api.chapa.co/v1";

// export const initializePayment = async (req, res) => {
//   const { enrollmentId, amount, method, email, firstName, lastName } = req.body;

//   try {
//     // Validate request body
//     if (!enrollmentId || !amount || !method || !email || !firstName || !lastName) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing required fields: enrollmentId, amount, method, email, firstName, lastName.",
//       });
//     }

//     const tx_ref = `tx_${Date.now()}`;
//     const callback_url = `${process.env.CLIENT_URL}/payment-success`;

//     // Make API request to Chapa
//     const chapaResponse = await axios.post(
//       `${CHAPA_BASE_URL}/transaction/initialize`,
//       {
//         amount,
//         currency: "ETB",
//         email,
//         first_name: firstName,
//         last_name: lastName,
//         tx_ref,
//         callback_url,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
//         },
//       }
//     );

//     const { data } = chapaResponse;

//     // Check if checkout_url exists in the response
//     if (!data?.data?.checkout_url) {
//       throw new Error("Failed to initialize payment with Chapa.");
//     }

//     res.status(201).json({
//       success: true,
//       tx_ref,
//       enrollmentId,
//       checkout_url: data.data.checkout_url,
//     });
//   } catch (error) {
//     console.error("Payment Initialization Error:", error.message);

//     // Handle API or network errors
//     if (error.response) {
//       return res.status(500).json({
//         success: false,
//         message: "Payment initialization failed due to Chapa API error.",
//         error: error.response.data,
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: "Payment initialization failed due to a server error.",
//       error: error.message,
//     });
//   }
// };

  export const verifyPayment = async (req, res) => {
    const { tx_ref, enrollmentId } = req.query; // Get tx_ref and enrollmentId from the query
  
    try {
      if (!tx_ref || !enrollmentId) {
        return res.status(400).json({
          success: false,
          message: "Transaction reference (tx_ref) and enrollment ID are required.",
        });
      }
  
      // Verify payment with Chapa
      const result = await chapa.verify(tx_ref);
      if (result.status !== 'success') {
        return res.status(400).json({ success: false, message: 'Payment not verified' });
    }
        //1 Create a payment record in the database
        const payment = await Payment.create({
          amount: result.data.amount,
          method: result.data.method || "chapa", // Assuming `method` is returned
          tx_ref,
        });

  // Step 2: Retrieve the enrollment and course details
  const enrollment = await Enrollment.findById(enrollmentId);
  if (!enrollment) {
      return res.status(404).json({ success: false, message: 'Enrollment not found' });
  }

  const course = await Course.findById(enrollment.course);
  if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
  }

  // Step 3: Calculate and update enrollment payment status
  const amountPaid = parseFloat(result.data.amount); // Amount from Chapa verification response
  if (amountPaid >= course.fee) {
      enrollment.paymentStatus = "paid";
  } else if (amountPaid > 0) {
      enrollment.paymentStatus = "partially_paid";
  } else {
      enrollment.paymentStatus = "unpaid";
  }

  // Save the updated enrollment
  await enrollment.save();

        res.status(200).json({
          success: true,
          message: "Payment verified and recorded successfully.",
          payment,
        });
    
    } catch (error) {
      console.error("Payment Verification Error:", error.message);
      res.status(500).json({
        success: false,
        message: "Payment verification failed.",
        error: error.message,
      });
    }
  };
  

