import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { CategoriesModule } from '@/categories/categories.module';
import { PostsModule } from '@/posts/posts.module';

@Module({
  controllers: [],
  providers: [SeedService],
  imports: [CategoriesModule, PostsModule],
})
export class SeedModule {}
