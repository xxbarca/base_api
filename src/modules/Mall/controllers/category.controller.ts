import { Body, Controller, Post } from '@nestjs/common';
import { CategoryService } from '@/modules/Mall/services';
import { CreateCategoryDto } from '@/modules/Mall/dtos';

@Controller('category')
export class CategoryController {
  constructor(private service: CategoryService) {}

  @Post()
  async create(
    @Body()
    dto: CreateCategoryDto,
  ) {
    console.log(dto);
  }
}
