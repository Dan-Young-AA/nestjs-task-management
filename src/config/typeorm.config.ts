import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from "config";

type DbConfig = {
  host: string;
  username: string;
  password: string;
  synchronize: boolean;
  type: string;
  port: number;
  database: string;
};

const dbConfig = config.get<DbConfig>("db");

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type as "postgres",
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT
    ? parseInt(process.env.RDS_PORT, 10)
    : dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  entities: [__dirname + "/../**/*.entity.{js,ts}"],
  synchronize: process.env.TYPEORM_SYNC
    ? Boolean(process.env.TYPEORM_SYNC)
    : dbConfig.synchronize,
};
