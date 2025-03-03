import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PostsSeederService } from './posts.seeder.service';

@Module({
  imports: [PrismaModule],
  controllers: [PostsController],
  providers: [PostsService, PostsSeederService],
  exports: [PostsService, PostsSeederService],
})
export class PostsModule {}
