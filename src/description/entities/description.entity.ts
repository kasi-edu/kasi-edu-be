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
export class Description {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'nestjs' })
  @Column({ nullable: false })
  title: string;

  @ApiProperty({ example: 'Develop a productionized Dockerfile for Nestjs Microservices' })
  @Column({ nullable: false })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => VocationClass, (vocationClass) => vocationClass.descriptions)
  vocationClass: VocationClass;
}
