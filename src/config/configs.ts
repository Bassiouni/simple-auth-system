import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const database: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  autoLoadEntities: true,
}

export const config = () => ({
  env: process.env.ENV,
  port: Number(process.env.PORT),
  bcrypt_password: process.env.BCRYPT_SECRET,
  access_token_secret: process.env.JWT_ACCESS_SECRET,
  refresh_token_secret: process.env.JWT_REFRESH_SECRET,
  database,
});
