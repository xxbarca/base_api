import * as fs from 'node:fs';
import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ENV } from './constants';
function getEnv(env: string): Record<string, unknown> {
  if (fs.existsSync(env)) {
    return dotenv.parse(fs.readFileSync(env));
  }
  return {};
}

function buildConnectOptions() {
  const defaultConfig = getEnv('.env');
  const envConfig = getEnv(`.env.${process.env.NODE_ENV || 'production'}`);
  const config = { ...defaultConfig, ...envConfig };
  return {
    type: config[ENV.MYSQL_TYPE],
    host: config[ENV.MYSQL_HOST],
    port: config[ENV.MYSQL_PORT],
    username: config[ENV.MYSQL_USERNAME],
    password: config[ENV.MYSQL_PASSWORD],
    database: config[ENV.MYSQL_DATABASE],
    synchronize: false,
    logging: process.env.NODE_ENV === 'development',
    entities: [__dirname + '/**/*.entity.{js,ts}'],
  } as TypeOrmModuleOptions;
}

export const connectionParams = buildConnectOptions();

export default new DataSource({
  ...connectionParams,
  migrations: ['src/migrations/**'],
  subscribers: [],
} as DataSourceOptions);
