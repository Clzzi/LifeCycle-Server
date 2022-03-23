import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ length: 40, unique: true })
  userId: string;

  @Column({ length: 10 })
  name: string;

  @Column({ length: 256, nullable: false })
  pw: string;

  @Column()
  generation: number;
}
