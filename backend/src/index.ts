import { DataSource } from "typeorm";
import { config } from "./config/ormconfig";
import { app } from "./app";

export const AppDataSource = new DataSource(config);

const startUp = () => {
  AppDataSource.initialize()
    .then(() => {
      console.log("Data source has been initialized");
      app.listen(app.get("PORT"), () =>
        console.log(`Server is running port ${app.get("PORT")}`)
      );
    })
    .catch((err: Error) => {
      console.log("Error during Data Source initialization", err);
    });
};

startUp();
