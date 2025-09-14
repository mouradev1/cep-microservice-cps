import { Router } from "express";
import { cepController } from "../controllers/cepController";

const router = Router();

router.get("/:cep", cepController.find);

export default router;
