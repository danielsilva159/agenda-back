import  {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import User from './User';

@Entity('tb_pessoas')
export default class Pessoa {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ nullable: false})
    nome: string;

  @Column({
    nullable: false
  })
    email: string;

  @Column({ nullable: false})
    telefone: string;

  @ManyToOne(() => User, (user) => user.pessoas)
    user: User

  @CreateDateColumn({default: new Date()})
    create_at: Date;

  @UpdateDateColumn()
    updated_at: Date;
}

