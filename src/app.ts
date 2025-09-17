import express from "express";
import cors from "cors";
import cepRoutes from "./routes/cepRoutes";

const app = express();
app.set("trust proxy", true);
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send({
        message: "API de Consulta de CEP está funcionando!",
        version: "1.2.2",
        "server": "Nodejs Express",
        status: "OK",
        router: "/cep/:cep"
    });
});

app.use("/cep", cepRoutes);

export default app;
