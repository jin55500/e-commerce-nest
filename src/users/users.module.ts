import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from 'src/store/store.entity';

@Module({
  imports:[ TypeOrmModule.forFeature([User,Store])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
