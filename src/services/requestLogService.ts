import { RequestLogModel } from "../models/RequestLog";
import { Request } from "express";

export async function logRequestByIp(req: Request) {
  const ip = req.ip;
  await RequestLogModel.findOneAndUpdate(
    { ip },
    { $inc: { count: 1 }, $set: { lastRequest: new Date() } },
    { upsert: true, new: true }
  );
}
