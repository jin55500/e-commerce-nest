import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { UserCreateDto } from './dto/userCreate.dto';
import { User } from './user.entity';
import { UserUpdateDto } from './dto/userUpdate.dto';

@Controller('user')
export class UsersController {
    constructor(private userService:UsersService){}

    @Get()
    @UseGuards(AuthGuard,AdminGuard)
    async findAll(@Request() req): Promise<any> {
      return await this.userService.findAll()
    }

    @Post()
    @UseGuards(AuthGuard,AdminGuard)
    async createUser(@Body(new ValidationPipe) UserCreateDto:UserCreateDto):Promise<User>{
      return await this.userService.create(UserCreateDto)
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async findById(@Param('id') id : string) :Promise<User>{
        return await this.userService.findById(id)
    }

    @Patch(':id')
    @UseGuards(AuthGuard)
    async updateUser(@Param('id') id:string,@Body(new ValidationPipe) UserUpdateDto:UserUpdateDto):Promise<User>{
        return await this.userService.update(id,UserUpdateDto)
    }
}
