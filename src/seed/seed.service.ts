import { CategoriesService } from '@/categories/categories.service';
import { PostsService } from '@/posts/posts.service';
import { Injectable } from '@nestjs/common';
import { PostsSeederService } from '../posts/posts.seeder.service';
import { CategoriesSeederService } from '@/categories/categories.seeder.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly postsService: PostsService,
    private readonly postsSeederService: PostsSeederService,
    private readonly categoriesService: CategoriesService,
    private readonly categoriesSeederService: CategoriesSeederService,
  ) {}

  async deleteAll() {
    await this.categoriesService.removeAll();
    await this.postsService.removeAll();
  }

  async run() {
    const categories =
      await this.categoriesSeederService.generateCategories(10);

    await this.postsSeederService.generateRandomPosts({
      categories,
    });
  }
}
