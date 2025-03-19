import { Module } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { AttributeController } from './attribute.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  
  controllers: [AttributeController],
  providers: [AttributeService],
})
export class AttributeModule {}
