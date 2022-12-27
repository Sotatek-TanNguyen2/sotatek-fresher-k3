// import { Expose, Transform } from 'class-transformer';
// import { dateTransformer } from 'src/shares/helpers/transformer';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  // @Expose()
  username: string;

  @Column()
  name: string;

  @Column()
  // @Expose()
  email: string;

  @Column()
  password: string;

  @Column()
  bio: string;

  @Column()
  location: string;

  @Column()
  // @Expose()
  role: string;

  @Column()
  // @Expose()
  status: string;

  @CreateDateColumn()
  // @Transform(dateTransformer)
  createdAt: Date;

  @UpdateDateColumn()
  // @Transform(dateTransformer)
  updatedAt: Date;
}
