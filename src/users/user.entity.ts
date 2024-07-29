import { Store } from 'src/store/store.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({type:'varchar', length:255})
  name: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({type:'varchar',length:10,default:"user"})
  type:string

  
  @OneToOne(() => Store, store => store.user)
  store: Store;
}