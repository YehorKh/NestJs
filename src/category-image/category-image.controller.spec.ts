import { Test, TestingModule } from '@nestjs/testing';
import { CategoryImageController } from './category-image.controller';

describe('CategoryImageController', () => {
  let controller: CategoryImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryImageController],
    }).compile();

    controller = module.get<CategoryImageController>(CategoryImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
