import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
} from "sequelize-typescript";
import { Movie } from "./movie.model";
import { Producer } from "./producer.model";

@Table({
  tableName: "movie_producer",
  timestamps: false,
})
export class MovieProducer extends Model {
  @ForeignKey(() => Movie)
  @Column({ type: DataType.INTEGER })
  declare movieId: number;

  @ForeignKey(() => Producer)
  @Column({ type: DataType.INTEGER })
  declare producerId: number;
}
