import mongoose from "mongoose";

const RequestLogSchema = new mongoose.Schema({
  ip: { type: String, required: true, unique: true },
  count: { type: Number, default: 1 },
  lastRequest: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

export const RequestLogModel = mongoose.model("RequestLog", RequestLogSchema);
