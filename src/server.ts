import app from "./app";
import { connectMongo } from "./config/mongo";
import { connectRedis } from "./config/redis";
import { env } from "./config/env";

(async () => {
  await connectMongo(env.mongoUri);
  await connectRedis();

  app.listen(env.port, () => {
    console.log(`🚀 Servidor rodando na porta ${env.port}`);
  });
})();
