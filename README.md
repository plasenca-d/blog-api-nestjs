# 🛠️ NestJS Blog API with Prisma & PostgreSQL

This is the **backend** for a simple blog application built with **NestJS**, using **Prisma** as ORM and **PostgreSQL** as the database. The API is documented with **Swagger** and supports local development using **Docker Compose**.

---

## 📂 Project Structure

```bash
/backend
│── src/
│   ├── posts/       # Posts module (controller, service, DTOs)
│   ├── prisma/      # Prisma service and configuration
│   ├── main.ts      # Entry point
│── prisma/          # Prisma migrations and schema
│── .env             # Environment variables
│── docker-compose.yml  # PostgreSQL setup
```

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/plasenca-d/blog-api-nestjs.git
cd blog-api-nestjs
```

### 2️⃣ Set up the database with Docker

Make sure **Docker** is installed, then run:

```bash
docker-compose up -d
```

This will start a PostgreSQL database on `localhost:5432`.

### 3️⃣ Configure Prisma

Copy .env.template to .env and update the DATABASE_URL with your PostgreSQL credentials:

```env
DATABASE_URL="postgresql://bloguser:blogpassword@localhost:5432/blogdb"
```

Then, run:

```bash
npx prisma migrate dev
```

### 4️⃣ Install dependencies and run the server

```bash
npm install
npm run start
```

The API will be available at: **`http://localhost:3000`**

---

## 🔗 API Documentation (Swagger)

Once the backend is running, you can access the API documentation at:
👉 **`http://localhost:3000/api`**

This includes endpoints such as:

- **GET** `/posts` → Fetch all posts.
- **GET** `/posts/:slug` → Fetch a single post by slug.
- **POST** `/posts` → Create a new post.

---

## 📌 Environment Variables

Create a `.env` file and define the following:

```env
DATABASE_URL="postgresql://bloguser:blogpassword@localhost:5432/blogdb"
PORT=3000
```

---

## 🛠️ Tech Stack

- **NestJS** - Backend framework
- **Prisma** - ORM for database management
- **PostgreSQL** - Database
- **Docker** - Local development environment
- **Swagger** - API documentation

---

## 👨‍💻 Contributing

Feel free to open an issue or a pull request if you’d like to contribute! 🚀

---

## 📜 License

This project is open-source and licensed under the **MIT License**.

---

### 🚀 Happy coding! 🎯
