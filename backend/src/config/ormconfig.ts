import { getEnv } from "@/utilities/getEnv";
import { DataSourceOptions } from "typeorm";

getEnv();
const config: DataSourceOptions = {
  type: "mariadb",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
  synchronize: process.env.DB_SYNCHRONIZE === "true",
  logging: process.env.DB_LOGGING === "true",
  entities: [process.env.DB_ENTITIES || ""],
  migrations: [process.env.DB_MIGRATIONS || ""],
  subscribers: [process.env.DB_SUBSCRIVERS || ""],
};

export { config };
