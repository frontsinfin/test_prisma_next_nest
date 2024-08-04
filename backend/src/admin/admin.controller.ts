import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto } from './dto/admin.dto';
import { PrismaService } from 'src/prisma.service';
import { Auth } from './decorators/auth.decorator';
import { Request, Response } from 'express';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly prismaService: PrismaService,
  ) {}

  @HttpCode(200)
  @Post('login')
  async login(
    @Body() dto: AdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, ...response } = await this.adminService.login(dto);
    this.adminService.addRefreshTokenToResponse(res, refreshToken);

    return response;
  }

  @HttpCode(200)
  @Post('register')
  async register(
    @Body() dto: AdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, ...response } = await this.adminService.register(dto);
    this.adminService.addRefreshTokenToResponse(res, refreshToken);

    return response;
  }

  @HttpCode(200)
  @Post('login/access-token')
  async getNewTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshTokenFromCookies =
      req.cookies[this.adminService.REFRESH_TOKEN_NAME];

    if (!refreshTokenFromCookies) {
      this.adminService.removeRefreshTokenFromResponse(res);
      throw new UnauthorizedException('Refresh token not passed');
    }

    const { refreshToken, ...response } = await this.adminService.getNewTokens(
      refreshTokenFromCookies,
    );

    this.adminService.addRefreshTokenToResponse(res, refreshToken);

    return response;
  }

  @HttpCode(200)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    this.adminService.removeRefreshTokenFromResponse(res);
    return true;
  }

  @Get('all')
  @Auth()
  async findAll() {
    return this.adminService.findAll();
  }
}
