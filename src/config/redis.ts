import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
const redisUser = process.env.REDIS_USER || undefined;
const redisPass = process.env.REDIS_PASS || undefined;

export const redisClient = createClient({
  url: redisUrl,
  username: redisUser,
  password: redisPass,
});

redisClient.on("connect", () => console.log("Redis conectado ⚡"));
redisClient.on("error", (err) => console.error("Erro no Redis", err));

export const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (err: any) {
    console.warn("Redis não conectado:", err?.message || err);
  }
};
