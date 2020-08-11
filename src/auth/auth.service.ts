import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) { }


    async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
        return this.userRepository.signUp(authCredentials);
    }

    async signIn(authCredentials: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const username = await this.userRepository.validateUserPassword(authCredentials);
        if (!username) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { username };

        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };
    }
}
