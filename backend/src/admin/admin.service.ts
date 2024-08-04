import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminDto } from './dto/admin.dto';
import { PrismaService } from 'src/prisma.service';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AdminService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  EXPIRE_DAY_REFRESH_TOKEN = 1;
  REFRESH_TOKEN_NAME = 'refreshToken';

  async register(dto: AdminDto) {
    const oldAdmin = await this.getByEmail(dto.email);

    if (oldAdmin) throw new BadRequestException('Админ существует');

    const { password, ...admin } = await this.create(dto);
    const tokens = this.issueTokens(admin.id);
    return { admin, ...tokens };
  }

  async create(dto: AdminDto) {
    const admin: AdminDto = {
      email: dto.email,
      password: await hash(dto.password),
    };
    return this.prismaService.admin.create({ data: admin });
  }

  async login(dto: AdminDto) {
    //по почте находим админа
    const { password, ...admin } = await this.validateUser(dto);

    const tokens = this.issueTokens(admin.id);
    return { admin, ...tokens };
  }

  private issueTokens(adminId: string) {
    const data = { id: adminId };

    const accessToken = this.jwtService.sign(data, {
      expiresIn: '1h',
    });

    const refreshToken = this.jwtService.sign(data, {
      expiresIn: '7d',
    });
    return { accessToken, refreshToken };
  }

  private async validateUser(dto: AdminDto) {
    const admin = await this.getByEmail(dto.email);

    if (!admin) throw new NotFoundException('Admin not found');

    const isValid = await verify(admin.password, dto.password);

    if (!isValid) throw new UnauthorizedException('Invalid password');

    return admin;
  }

  async getByEmail(email: string) {
    return this.prismaService.admin.findUnique({ where: { email } });
  }
  async getById(id: string) {
    return this.prismaService.admin.findUnique({ where: { id } });
  }

  async findAll() {
    return this.prismaService.admin.findMany({
      select: { id: true, email: true },
    });
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwtService.verifyAsync(refreshToken);
    if (!result) throw new UnauthorizedException('Invalid refresh token');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const admin = await this.getById(result.id);

    const tokens = this.issueTokens(admin.id);

    return {
      admin,
      ...tokens,
    };
  }

  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      domain: 'localhost',
      expires: expiresIn,
      secure: true,
      // lax if production
      sameSite: 'none',
    });
  }

  removeRefreshTokenFromResponse(res: Response) {
    res.cookie(this.REFRESH_TOKEN_NAME, '', {
      httpOnly: true,
      domain: 'localhost',
      expires: new Date(0),
      secure: true,
      // lax if production
      sameSite: 'none',
    });
  }
}
