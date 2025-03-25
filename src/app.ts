import express from "express";
import sequelize from "./infrastructure/database";

const app = express();
const port = 3000;

async function initializeApp() {
  await sequelize.sync({ force: true });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

initializeApp().catch(console.error);
