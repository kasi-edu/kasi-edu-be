import { ApiProperty } from '@nestjs/swagger';
import { VocationClass } from 'src/class/entities/class.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Requirement {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'bisa menggunakan komputer' })
  @Column({ nullable: false })
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => VocationClass, (vocationClass) => vocationClass.requirements)
  vocationClass: VocationClass;
}
