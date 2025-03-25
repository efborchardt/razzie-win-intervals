import { Request, Response } from "express";
import { ProducerService } from "../services/producer.service";

export class ProducerController {
  private producerService = new ProducerService();

  async getProducersIntervals(req: Request, res: Response) {
    try {
      const result = await this.producerService.getProducersIntervals();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
