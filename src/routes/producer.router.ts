import express from "express";
import { ProducerController } from "../controllers/producer.controller";

const router = express.Router();
const controller = new ProducerController();

router.get(
  "/producers-intervals",
  controller.getProducersIntervals.bind(controller),
);

export default router;
