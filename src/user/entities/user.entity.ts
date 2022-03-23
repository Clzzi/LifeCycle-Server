import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ name: 'user_id', length: 40, unique: true })
  userId: string;

  @Column({ length: 10 })
  name: string;

  @Column({ length: 256, nullable: false, select: false })
  pw: string;

  @Column()
  generation: number;
}
