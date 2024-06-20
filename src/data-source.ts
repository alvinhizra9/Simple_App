import "reflect-metadata";
import { DataSource } from "typeorm";
// import { User } from "./entity/User"
import { DownloadDocxEntity } from "./downloadDocx/downloadDocx.entity";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [DownloadDocxEntity],
  migrations: [],
  subscribers: [],
});
