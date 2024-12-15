import mongoose from "mongoose";

const { Schema, model } = mongoose;

const paymentSchema = new Schema(
  {
    amount: { type: Number, required: true },
    currency: { type: String, default: "ETB" },
    method: { type: String, required: true }, // e.g., "Chapa"
    tx_ref: { type: String, unique: true }, // Transaction reference
  },
  { timestamps: true }
);

export const Payment = model("Payment", paymentSchema);
