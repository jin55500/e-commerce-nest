import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn } from 'typeorm';


@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 255 ,default:null})
  name: string;


  @OneToOne(() => User, user => user.store)
  @JoinColumn()
  user: User;
}
