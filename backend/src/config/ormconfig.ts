import { DataSourceOptions } from "typeorm";
import dotenv from "dotenv";

if (process.env.NODE_NEV) {
  dotenv.config({ path: "@/env/.env.test" });
}

const config: DataSourceOptions = {
  type: "mariadb",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
  synchronize: process.env.DB_SYNCHRONIZE === "true",
  logging: true,
  entities: [process.env.DB_ENTITIES || ""],
  migrations: [process.env.DB_MIGRATIONS || ""],
  subscribers: [process.env.DB_SUBSCRIVERS || ""],
  poolSize: 50,
  dateStrings: true,
  timezone: "Z",
};

export { config };
