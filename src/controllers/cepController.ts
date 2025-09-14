import { Request, Response } from "express";
import { getCepData } from "../services/cepService";
import { logRequestByIp } from "../services/requestLogService";

export const cepController = {
    async find(req: Request, res: Response) {
        try {
            const { cep } = req.params;
            const cleanCep = cep.replace(/\D/g, "");
            await logRequestByIp(req);

            if (cleanCep.length !== 8) {
                return res.status(400).json({ error: "CEP inválido" });
            }

            const data = await getCepData(cleanCep);
            return res.json(data);
        } catch (error) {
            return res.status(404).json({ error: "CEP não encontrado" });
        }
    }
};
