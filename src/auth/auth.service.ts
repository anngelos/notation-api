import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  createToken(user: User) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.name,
          nickname: user.nickname,
          email: user.email,
        },
        {
          expiresIn: '2 days',
          subject: String(user.id),
          issuer: 'Notation API',
          audience: 'Users',
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: 'Users',
        issuer: 'Notation API',
      });
      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async login(nickname: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: { nickname },
    });

    if (!user) {
      throw new UnauthorizedException('Apelido e/ou Senha incorretos.');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Apelido e/ou Senha incorretos.');
    }

    return this.createToken(user);
  }

  async register(data: AuthRegisterDTO) {
    const user = await this.userService.create(data);
    return this.createToken(user);
  }
}
