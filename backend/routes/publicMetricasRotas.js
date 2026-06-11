import express from "express";
import PublicMetricasController from "../controllers/PublicMetricasController.js";

const router = express.Router();

router.get("/metricas-home", PublicMetricasController.metricasHome);

export default router;