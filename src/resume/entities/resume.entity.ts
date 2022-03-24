import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Resume {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'created_at' })
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
