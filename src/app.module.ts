import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { CategoriesModule } from './categories/categories.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [PostsModule, CategoriesModule, SeedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
