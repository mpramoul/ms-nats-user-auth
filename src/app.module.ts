import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true,envFilePath: '.env',}),
    //Added code-------------------------------------------------
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST || "127.0.0.1",
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME,//"root",
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,//
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    //-----------------------------------------------------------
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
