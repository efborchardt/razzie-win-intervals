import { Producer } from "../models/producer.model";
import { Movie } from "../models/movie.model";

interface MovieResponse {
  title: string;
  studios: string;
  year: number;
  winner: boolean;
  producers: string[]
}

export class MovieService {
  async getMovies(): Promise<MovieResponse[]> {
    const movies = await Movie.findAll({
      include: [
        {
          model: Producer,
          through: { attributes: [] },
          attributes: ["name"],
        },
      ],
    });
  
    return movies.map(movie => ({
      title: movie.title,
      studios: movie.studios,
      year: movie.year,
      winner: movie.winner,
      producers: movie.producers.map(producer => producer.name),
    }));
  }
}