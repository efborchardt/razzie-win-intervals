import csv from "csv-parser";
import fs from "fs";
import { Movie } from "../models/movie.model";
import { Producer } from "../models/producer.model";
import { MovieProducer } from "../models/movie-producer.model";

export class DataLoadService {
  async loadDataFromCSV(filePath: string): Promise<void> {
    const rows = await this.readCSVFile(filePath);

    for (const row of rows) {
      const movie = await this.createMovies(row);
      const producerNames = this.splitProducerNames(row);
      await this.createMovieProducer(producerNames, movie);
    }
  }

  private async createMovieProducer(producerNames: string[], movie: Movie) {
    for (const name of producerNames) {
      const [producer] = await Producer.findOrCreate({
        where: { name },
      });
      await MovieProducer.create({
        movieId: movie.id,
        producerId: producer.id,
      });
    }
  }

  private splitProducerNames(row: any) {
    return row.producers.split(/, | and /).map((name: string) => name.trim());
  }

  private async createMovies(row: any) {
    return await Movie.create({
      year: parseInt(row.year, 10),
      title: row.title,
      studios: row.studios,
      winner: row.winner === "yes",
    });
  }

  private async readCSVFile(filePath: string) {
    return await new Promise<any[]>((resolve, reject) => {
      const results: any[] = [];
      fs.createReadStream(filePath)
        .pipe(csv({ separator: ";" }))
        .on("data", (data) => results.push(data))
        .on("end", () => resolve(results))
        .on("error", (error) => reject(error));
    });
  }
}
