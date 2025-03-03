import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma.service';
import { convertTextToSlug } from '@/helpers/text.helper';
import { PaginationDto } from '../shared/dtos/pagination.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto;

    const slug = convertTextToSlug(name);

    const categoryExists = await this.prismaService.category.findFirst({
      where: {
        slug,
      },
    });

    if (categoryExists) {
      throw new ConflictException('Category already exists');
    }

    return await this.prismaService.category.create({
      data: {
        ...createCategoryDto,
        slug,
      },
    });
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 1 } = paginationDto;

    const skip = (page - 1) * limit;

    return this.prismaService.category.findMany({
      take: limit,
      skip,
    });
  }

  async findOne(id: string) {
    const category = await this.prismaService.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      throw new ConflictException('Category not found');
    }

    return this.prismaService.category.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(id);

    return this.prismaService.category.update({
      where: {
        id,
      },
      data: {
        ...updateCategoryDto,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prismaService.category.delete({
      where: {
        id,
      },
    });
  }

  async removeAll() {
    await this.prismaService.category.deleteMany();
  }
}
