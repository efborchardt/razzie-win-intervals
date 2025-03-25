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
import { Producer } from "./producer.model";

@Table({
  tableName: "movie",
  timestamps: false,
})
export class Movie extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @Column({ type: DataType.INTEGER })
  declare year: number;

  @Column({ type: DataType.STRING })
  declare title: string;

  @Column({ type: DataType.STRING })
  declare studios: string;

  @Column({ type: DataType.BOOLEAN })
  declare winner: boolean;

  @BelongsToMany(() => Producer, () => MovieProducer)
  declare producers: Producer[];
}
