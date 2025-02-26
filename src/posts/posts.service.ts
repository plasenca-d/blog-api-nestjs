import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    const { title, content } = createPostDto;

    const slug = title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+|-+$/g, '');

    const existingPost = await this.prismaService.post.findUnique({
      where: { slug },
    });

    if (existingPost) {
      throw new ConflictException('Slug already exists');
    }

    return await this.prismaService.post.create({
      data: {
        title,
        content,
        slug,
      },
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;

    const posts = await this.prismaService.post.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return posts.map((post) => ({
      ...post,
      content:
        post.content.substring(0, 200) +
        (post.content.length > 200 ? '...' : ''),
    }));
  }

  async findOne(id: string) {
    const post = await this.prismaService.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    await this.findOne(id);

    const { title } = updatePostDto;
    let slug: string | undefined = undefined;

    if (title) {
      slug = title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+|-+$/g, '');

      const existingPost = await this.prismaService.post.findUnique({
        where: { slug },
      });

      if (existingPost && existingPost.id !== id) {
        throw new ConflictException('Slug already exists');
      }
    }

    return await this.prismaService.post.update({
      where: { id },
      data: {
        ...updatePostDto,
        slug,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return await this.prismaService.post.delete({
      where: { id },
    });
  }
}
