import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { JwtStrategy } from './service/jwt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Entity/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([User]),
        PassportModule,
    JwtModule.register({
        secret: 'your_secret_key', // Use environment variable for production
        signOptions: { expiresIn: '60m' },
    })],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController]
})
export class AuthenticationModule { }
