import {
  randAddress,
  randEmail,
  randFullName,
  randPassword,
  randPhoneNumber,
} from '@ngneat/falso';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Category } from 'src/category/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: randEmail(),
    description: 'Primary email for user & vocation register',
  })
  @Column({ unique: true, nullable: false })
  email: string;

  @ApiProperty({
    example: randEmail(),
    description: 'Secondary email for vocation register',
  })
  @Column({ unique: true, nullable: true, default: null })
  vocationEmail: string;

  @ApiProperty({
    example: randPassword(),
    description: 'Password for register',
  })
  @Column({ nullable: false })
  @Exclude()
  password: string;

  @ApiProperty({
    example: ['vocation', 'company', 'user'],
    description: 'a user type, is a normal user or vocation',
  })
  @Column({
    type: 'enum',
    enum: ['vocation', 'company', 'user'],
    default: 'vocation',
  })
  type: string;

  @ApiProperty({
    example: randAddress(),
    description: 'a full address location for user & vocation',
  })
  @Column({ nullable: false })
  address: string;

  @ApiProperty({
    example:
      'Belajar sql, linux, web development, data storage, data pipieline, dan etl/elt sampai ahli',
    description: 'A long description for tell about user & vocations',
  })
  @Column({ nullable: true, default: null })
  description: string;

  @ApiProperty({
    example: randFullName(),
    description: 'A contact person for vocation',
  })
  @Column({ nullable: true, default: null })
  contactPerson: string;

  @ApiProperty({
    example: randPhoneNumber(),
    description: 'The primary phone number for user & vocation',
  })
  @Column({ nullable: false })
  phoneOne: string;

  @ApiProperty({
    example: randPhoneNumber(),
    description:
      'The secondary phone number for user & vocation, this is optional',
  })
  @Column({ nullable: true, default: null })
  phoneTwo: string;

  @ApiProperty()
  @Column({ nullable: true })
  refreshToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Category, (category) => category.users, {
    onDelete: 'CASCADE',
  })
  category: Category;
}
