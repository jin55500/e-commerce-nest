import { Body, Controller, Get, InternalServerErrorException, Post, Request, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { RegisterDto } from './register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { AuthGuard } from './guards/auth.guard';
import { promises } from 'dns';
import { RegisterInterceptor } from './interceptors/register.intercepter';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/register')
    @UseInterceptors(RegisterInterceptor)
    async register(@Body(new ValidationPipe) registerDto: RegisterDto){
        try {
            const data = await this.authService.register(registerDto);
            // let { name, email, ...user } = data;
            return data;
        } catch (error) {
            // จัดการข้อผิดพลาดที่เกิดขึ้น
            throw new InternalServerErrorException(error);
        }
    }

    @Post('login')
    async login(@Body(new ValidationPipe) LoginDto:LoginDto) {
        const data = await this.authService.login(LoginDto);
        return {
            "success" : true,
            "message" : "login success",
            "token" : data.access_token
        }
    }

    
    @Get('profile')
    @UseGuards(AuthGuard)
    async getProfile(@Request() req:any): Promise<any> {
      return req.user;
    }

}
