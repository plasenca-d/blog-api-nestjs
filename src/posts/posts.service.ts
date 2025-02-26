import {
  ConflictException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';

import { faker } from '@faker-js/faker';

@Injectable()
export class PostsService implements OnModuleInit {
  constructor(private readonly prismaService: PrismaService) {}

  async onModuleInit() {
    await this.removeAll();

    for (let i = 0; i < 10; i++) {
      try {
        await this.create({
          title: faker.lorem.words(3),
          content: this.generateMarkdown(),
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  private generateMarkdown() {
    return `
# ${faker.lorem.words(4)}

${faker.lorem.paragraphs(3)}

## ${faker.lorem.words(3)}

${faker.lorem.paragraphs(2)}

### 📌 ${faker.lorem.words(3)}

- ✅ ${faker.lorem.sentence()}
- ✅ ${faker.lorem.sentence()}
- ✅ ${faker.lorem.sentence()}
- ✅ ${faker.lorem.sentence()}
- ✅ ${faker.lorem.sentence()}

---

### **📷 Imagen Aleatoria**
![${faker.lorem.words(2)}](https://source.unsplash.com/random/800x400?sig=${faker.number.int(100)})

---

## 🔥 ${faker.lorem.words(3)}

> "${faker.lorem.sentence()}"

${faker.lorem.paragraphs(2)}

### **Código Aleatorio**
\`\`\`javascript
function ${faker.lorem.word()}() {
  console.log("${faker.hacker.phrase()}");
}
\`\`\`

### 📢 **Conclusión**
${faker.lorem.paragraphs(2)}

[Lee más aquí](https://${faker.internet.domainName()})
    `;
  }

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

  async removeAll() {
    return await this.prismaService.post.deleteMany();
  }
}
