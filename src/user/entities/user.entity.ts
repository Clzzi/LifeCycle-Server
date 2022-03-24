import { Resume } from 'src/resume/entities/resume.entity';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ name: 'user_id', length: 40, unique: true })
  userId: string;

  @Column({ length: 10, nullable: false })
  name: string;

  @Column({ length: 256, nullable: false, select: false })
  pw: string;

  @Column({ nullable: false })
  generation: number;

  @OneToOne(() => Resume, (resume) => resume.user)
  resume: Resume;
}
