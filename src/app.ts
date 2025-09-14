import express from "express";
import cors from "cors";
import cepRoutes from "./routes/cepRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/cep", cepRoutes);

export default app;
