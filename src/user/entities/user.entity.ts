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
  @Column({ unique: true, nullable: false })
  email: string;

  @ApiProperty()
  @Column({ nullable: false })
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
  category: string;

  @ApiProperty()
  @Column({ nullable: false })
  address: string;

  @ApiProperty()
  @Column({ nullable: true })
  description: string;

  @ApiProperty()
  @Column({ nullable: false })
  contactPerson: string;

  @ApiProperty()
  @Column({ nullable: false })
  phoneOne: string;

  @ApiProperty()
  @Column({ nullable: true })
  phoneTwo: string;

  @ApiProperty()
  @Column({ nullable: true })
  refreshToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
