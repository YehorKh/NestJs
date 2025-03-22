import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CategoryImageService } from './category-image.service';
import { CreateCategoryImageDto } from './dto/create-category-image.dto';
import { UpdateCategoryImageDto } from './dto/update-category-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller("CategoryImage")
export class CategoryImageController {
  constructor(private readonly categoryImageService: CategoryImageService) {}
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        name: { type: 'string' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createCategoryImageDto: CreateCategoryImageDto,
  ) {
    return this.categoryImageService.create(createCategoryImageDto, file);
  }

  @Get()
  findAll() {
    return this.categoryImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoryImageService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCategoryImageDto: UpdateCategoryImageDto) {
    return this.categoryImageService.update(id, updateCategoryImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoryImageService.remove(id);
  }
}