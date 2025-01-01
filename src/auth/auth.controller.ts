import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({ type: AuthDto })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: AuthDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
