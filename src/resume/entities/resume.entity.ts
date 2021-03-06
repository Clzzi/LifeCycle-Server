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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  company: string;

  @Column({ nullable: false })
  stack: string;

  @Column({ nullable: false })
  thumbnail: string;

  @Column({ nullable: false })
  content: string;

  @OneToOne(() => User, (user) => user.userId)
  @JoinColumn({ name: 'fk_user' })
  user: User;
}
