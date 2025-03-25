import { Sequelize } from "sequelize-typescript";
import { Movie } from "../models/movie.model";
import { Producer } from "../models/producer.model";
import { MovieProducer } from "../models/movie-producer.model";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
  models: [Movie, Producer, MovieProducer],
  logging: false,
});

export default sequelize;
