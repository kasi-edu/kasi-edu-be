import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ unique: true, nullable: true })
  email: string;

  @ApiProperty()
  @Column({ nullable: true })
  @Exclude()
  password: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ['vocation', 'company', 'user'],
    default: 'vocation',
  })
  type: string;

  @ApiProperty()
  @Column({ nullable: true })
  address: string;

  @ApiProperty()
  @Column({ nullable: true })
  description: string;

  @ApiProperty()
  @Column({ nullable: true })
  contactPerson: string;

  @ApiProperty()
  @Column({ nullable: true })
  phoneOne: string;

  @ApiProperty()
  @Column({ nullable: true })
  phoneTwo: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
