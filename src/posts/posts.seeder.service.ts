import { faker } from '@faker-js/faker/locale/es';
import { Category } from '@prisma/client';
import { PostsService } from './posts.service';

export class PostsSeederService {
  constructor(private readonly postsService: PostsService) {}

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

  async generateRandomPosts({ categories }: { categories: Category[] }) {
    for (let i = 0; i < categories.length; i++) {
      try {
        const category = categories.at(i)!;

        await this.postsService.create({
          title: faker.lorem.words(3),
          content: this.generateMarkdown(),
          categoryId: category.id,
        });
      } catch (error) {
        console.error(error);
      }
    }
  }
}
