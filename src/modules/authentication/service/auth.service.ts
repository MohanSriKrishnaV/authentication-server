import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../Entity/user.entity';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async register(username: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.usersRepository.create({ username, password: hashedPassword });
        return this.usersRepository.save(user);
    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersRepository.findOne({ where: { username } });
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(username: string, password: string): Promise<any> {
        const user = await this.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
