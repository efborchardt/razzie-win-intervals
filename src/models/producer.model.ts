import {
  Table,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  Model,
  BelongsToMany,
} from "sequelize-typescript";
import { MovieProducer } from "./movie-producer.model";
import { Movie } from "./movie.model";

@Table({
  tableName: "producer",
  timestamps: false,
})
export class Producer extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @Column({ allowNull: false, type: DataType.STRING })
  declare name: string;

  @BelongsToMany(() => Movie, () => MovieProducer)
  declare movies: Movie[];
}
