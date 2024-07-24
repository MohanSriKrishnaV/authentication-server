import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/authentication/Entity/user.entity';


@Module({
  imports: [AuthenticationModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'mohansql',
    database: 'mydb',
    entities: [User],
    autoLoadEntities: true,
    synchronize: true,
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
