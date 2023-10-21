import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const {
  ENV,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  PORT,
  BCRYPT_SECRET,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
} = process.env;

const database: TypeOrmModuleOptions = {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: true,
  autoLoadEntities: true,
};

export const config = () => ({
  env: ENV,
  port: Number(PORT),
  bcrypt_password: BCRYPT_SECRET,
  access_token_secret: JWT_ACCESS_SECRET,
  refresh_token_secret: JWT_REFRESH_SECRET,
  database,
});
