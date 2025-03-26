import express from "express";
import { MovieController } from "../controllers/movie.controller";

const router = express.Router();
const controller = new MovieController();

router.get(
  "/movies",
  controller.getMovies.bind(controller),
);

export default router;
