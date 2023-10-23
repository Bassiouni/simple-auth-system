import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { config } from './config/configs';
import { DatabaseConfig } from './config/database.config';
import { ControlPanelModule } from './control-panel/control-panel.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [config],
    }),
    JwtModule.register({ global: true }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfig,
    }),
    AuthModule,
    UserModule,
    ControlPanelModule,
  ],
})
export class AppModule {}
