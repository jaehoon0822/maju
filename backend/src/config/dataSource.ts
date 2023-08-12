import { DataSource } from "typeorm";
// typeORM 의 config 파일
import { config } from "./ormconfig";

// typeORM 의 DataSource 로 DB 연결
export const AppDataSource = new DataSource(config);
