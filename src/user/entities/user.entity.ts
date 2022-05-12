import { Resume } from 'src/resume/entities/resume.entity';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ name: 'user_id', length: 40, unique: true, charset: 'utf8' })
  userId: string;

  @Column({ length: 10, nullable: false, charset: 'utf8' })
  name: string;

  @Column({ length: 256, nullable: false, select: false, charset: 'utf8' })
  pw: string;

  @Column({ nullable: false, charset: 'utf8' })
  generation: number;

  @OneToOne(() => Resume, (resume) => resume.user)
  resume: Resume;
}
