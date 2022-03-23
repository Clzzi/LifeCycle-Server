import { Column, Entity } from 'typeorm';

@Entity()
export class User {
  @Column({ length: 40, unique: true })
  userId: string;

  @Column({ length: 10 })
  name: string;

  @Column({ length: 256, nullable: false })
  pw: string;

  @Column({ length: 5 })
  generation: number;
}
