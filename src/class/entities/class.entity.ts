import { ApiProperty } from '@nestjs/swagger';
import { Description } from 'src/description/entities/description.entity';
import { Requirement } from 'src/requirement/entities/requirement.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class VocationClass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @ApiProperty({ example: 'kelas memasak sushi' })
  name: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'memasak sushi dengan lengkap' })
  description: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 250000 })
  price: number;

  @Column({ nullable: true })
  @ApiProperty({
    example: new Date(),
    description: 'tanggal buka registrasi untuk kelas',
  })
  regisOpenDate: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: new Date(),
    description: 'tanggal registrasi selesai untuk kelas',
  })
  regisClosedDate: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: new Date(),
    description: 'tanggal kelas ini dimulai',
  })
  startDate: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 1 })
  duration: number;

  @Column({ type: 'enum', enum: ['month', 'week'], default: 'month' })
  @ApiProperty({ example: 'month' })
  durationType: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Description, (description: Description) => description.vocationClass, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  descriptions: Description[];

  @OneToMany(() => Requirement, (requirement: Requirement) => requirement.vocationClass, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  requirements: Requirement[];
}
