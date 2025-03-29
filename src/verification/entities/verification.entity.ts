import { ApiParam, ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('email_verifications')
export class EmailVerification {
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @Column({ unique: true })
  email: string;
  @ApiProperty()
  @Column()
  code: string;
  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;
}
