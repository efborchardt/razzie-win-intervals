import express from "express";
import sequelize from "./infrastructure/database";
import { DataLoadService } from "./services/data-load.service";
import producerRouter from "./routes/producer.router";

const app = express();
const port = 3000;

async function initializeApp() {
  await sequelize.sync({ force: true });
  const dataLoadingService = new DataLoadService();
  await dataLoadingService.loadDataFromCSV("./data/movielist.csv");

  app.use("/api", producerRouter);

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

initializeApp().catch(console.error);
