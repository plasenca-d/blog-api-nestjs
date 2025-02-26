import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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

  findAll() {
    return `This action returns all posts`;
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
