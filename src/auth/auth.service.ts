import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './register.dto';
import { User } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { LoginDto } from './login.dto';

import * as bcrypt from 'bcryptjs';
// import * as jwt from 'jsonwebtoken';
import { Store } from 'src/store/store.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Store)
        private readonly storeRepository: Repository<Store>,
        private readonly connection: Connection,
        private jwtService: JwtService
      ) {}

    
    async register(registerDto: RegisterDto): Promise<User>{
        // console.log("test");
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        try{
            await queryRunner.startTransaction();

            const existingUser = await this.userRepository.findOne({
                where: [
                    { email: registerDto.email },
                    { name: registerDto.name },
                ],
            });
          
            if (existingUser) {
                // ถ้ามีผู้ใช้ที่มีอีเมลหรือชื่อผู้ใช้ซ้ำ
                throw new ConflictException('Email or username already exists');
            }
    
            registerDto.password = await bcrypt.hash(registerDto.password, 10);
            const createUser = await queryRunner.manager.save(User, registerDto);
            const createStore = await queryRunner.manager.save(Store, { name:createUser.name,user: createUser });

            await queryRunner.commitTransaction();
            await queryRunner.release();

            return createUser
        }catch(err){
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            throw err;
        }

    }

    async login(loginDto: LoginDto): Promise<{ access_token: string }> {
        const user = await this.userRepository.findOne({ where: { email: loginDto.email } });
    
        if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
          throw new UnauthorizedException('Invalid credentials');
        }
    
        const payload = { name: user.name, id: user.id ,type:user.type};
        const token = await this.jwtService.signAsync(payload);
    
        return { access_token: token };
    }
    
}
