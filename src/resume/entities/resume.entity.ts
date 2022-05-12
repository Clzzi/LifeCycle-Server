import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Resume {
  @PrimaryGeneratedColumn()
  idx: number;

  @CreateDateColumn({ name: 'created_at', charset: 'utf8' })
  createdAt: Date;

  @Column({ nullable: false, charset: 'utf8' })
  title: string;

  @Column({ nullable: false, charset: 'utf8' })
  company: string;

  @Column({ nullable: false, charset: 'utf8' })
  stack: string;

  @Column({ nullable: false, charset: 'utf8' })
  thumbnail: string;

  @Column({ nullable: false, charset: 'utf8' })
  content: string;

  @OneToOne(() => User, (user) => user.userId)
  @JoinColumn({ name: 'fk_user' })
  user: User;
}
