import { Producer } from "../models/producer.model";
import { Movie } from "../models/movie.model";

interface Interval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export class ProducerService {
  async getProducersIntervals() {
    const producers = await this.findAllProducersWithWins();

    const intervals: Interval[] = [];

    for (const producer of producers) {
      const years = producer.movies
        .map((movie) => movie.year)
        .sort((a, b) => a - b);

      if (years.length < 2) continue;

      for (let i = 1; i < years.length; i++) {
        const previousWin = years[i - 1];
        const followingWin = years[i];
        intervals.push({
          producer: producer.name,
          interval: followingWin - previousWin,
          previousWin,
          followingWin,
        });
      }
    }

    if (intervals.length === 0) return { min: [], max: [] };

    const minInterval = Math.min(...intervals.map((i) => i.interval));
    const maxInterval = Math.max(...intervals.map((i) => i.interval));

    return {
      min: intervals.filter((i) => i.interval === minInterval),
      max: intervals.filter((i) => i.interval === maxInterval),
    };
  }

  private async findAllProducersWithWins() {
    return await Producer.findAll({
      include: [
        {
          model: Movie,
          through: { attributes: [] },
          where: { winner: true },
          attributes: ["year"],
        },
      ],
    });
  }
}
