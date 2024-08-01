import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Connection, Not, Repository } from 'typeorm';
import { UserCreateDto } from './dto/userCreate.dto';
import * as bcrypt from 'bcryptjs';
import { Store } from 'src/store/store.entity';
import { UserUpdateDto } from './dto/userUpdate.dto';
import {  UserSearchDto } from './dto/userSearch.dto';
import { query } from 'express';
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository : Repository<User>,
        @InjectRepository(Store) private readonly storeRepository: Repository<Store>,
        private readonly connection: Connection,
    ){}

    async findAll(userSearchDto:UserSearchDto): Promise<{ data: User[], total: number }>{
        const { search, page = 1, size = 10 } = userSearchDto;

        const user = this.userRepository.createQueryBuilder('user')
        .innerJoinAndSelect('user.store', 'store')
        
        if(search){
            user.where(`user.name LIKE '%${search}%' OR user.email LIKE '%${search}%'`)
        }

        user.skip((page-1)*size).take(size)
        // return await this.userRepository.find({
        //     relations:['store'],
        // })
        const [data, total] = await user.getManyAndCount();
        return { data, total };

    }

    async create(UserCreateDto:UserCreateDto): Promise<User>{
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        try{
            await queryRunner.startTransaction();

            const existingUser = await this.userRepository.findOne({
                where: [
                    { email: UserCreateDto.email },
                    { name: UserCreateDto.name },
                    { 
                        store:  {
                            name:UserCreateDto.storeName
                        }
                    }
                ],
            });
          
            if (existingUser) {
                // ถ้ามีผู้ใช้ที่มีอีเมลหรือชื่อผู้ใช้ซ้ำ
                throw new ConflictException('Email or username already exists');
            }
    
            UserCreateDto.password = await bcrypt.hash(UserCreateDto.password, 10);
            const createUser = await queryRunner.manager.save(User, UserCreateDto);
            const createStore = await queryRunner.manager.save(Store, { name:UserCreateDto.storeName,user: createUser });

            
            await queryRunner.commitTransaction();
            await queryRunner.release();
            return createUser
        }catch(err){
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            throw err;
        }
    }

    async findById(id:string):Promise<User>{
        const user = await this.userRepository.findOne({
            where:{
                id:id
            },
            relations:[
                'store'
            ]
        })
        if(!user){
            throw new NotFoundException()
        }

        const store = await this.storeRepository.find({where:{user}})
        console.log(store)
        return user
        
    }

    async update(id:string,UserUpdateDto:UserUpdateDto):Promise<User>{
        try{

            const user = await this.userRepository.findOne({
                where:{
                    id:id
                }
            })
            if(!user){
                throw new NotFoundException()
            }

            const existingUser = await this.userRepository.createQueryBuilder('user')
            .where(`(user.name = '${UserUpdateDto.name}' OR user.email = '${UserUpdateDto.email}')`)
            .andWhere(`user.id != ${id}`)
            .getOne();
            if (existingUser) {
                // ถ้ามีผู้ใช้ที่มีอีเมลหรือชื่อผู้ใช้ซ้ำ
                throw new ConflictException('Email or username already exists');
            }

            if(UserUpdateDto.password){
                UserUpdateDto.password = await bcrypt.hash(UserUpdateDto.password, 10);
            }
            Object.assign(user, UserUpdateDto);
            return await this.userRepository.save(user)
        }catch(err){
            // console.log(err)
            throw new InternalServerErrorException(err)
        }
    }
}
