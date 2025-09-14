import dotenv from "dotenv";

dotenv.config();

export const env = {
    port: process.env.PORT || "3000",
    mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/cepdb",
    redisUrl: process.env.REDIS_URL || "redis://localhost:6379"
};
