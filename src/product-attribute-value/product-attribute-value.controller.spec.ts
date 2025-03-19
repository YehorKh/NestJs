import { Test, TestingModule } from '@nestjs/testing';
import { ProductAttributeValueController } from './product-attribute-value.controller';

describe('ProductAttributeValueController', () => {
  let controller: ProductAttributeValueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductAttributeValueController],
    }).compile();

    controller = module.get<ProductAttributeValueController>(ProductAttributeValueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
