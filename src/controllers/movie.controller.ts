import { Request, Response } from "express";
import { MovieService } from "../services/movie.service";

export class MovieController {
  private movieService = new MovieService();

  async getMovies(req: Request, res: Response) {
    try {
      const result = await this.movieService.getMovies();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
