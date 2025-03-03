import { faker } from '@faker-js/faker/locale/es';
import { CategoriesService } from './categories.service';
import { Category } from '@prisma/client';

export class CategoriesSeederService {
  constructor(private readonly categoriesService: CategoriesService) {}

  async generateCategories(number: number = 10) {
    const categories: Category[] = [];

    for (let i = 0; i < number; i++) {
      const category = await this.categoriesService.create({
        name: `Category ${i}`,
        color: faker.color.rgb(),
      });

      categories.push(category);
    }

    return categories;
  }
}
