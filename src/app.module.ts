import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from './users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersController } from './users/users.controller';
import { BcryptService } from './bcrypt/bcrypt.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'diploma-project',
    entities: [User],
    synchronize: true,
  })
  ,ConfigModule.forRoot({
    isGlobal: true,
  }),
  TypeOrmModule.forFeature([User])
  ,UsersModule, JwtModule, AuthModule],
  controllers: [AppController,UsersController],
  providers: [AppService,UsersService,JwtService,BcryptService],
})
export class AppModule {}
