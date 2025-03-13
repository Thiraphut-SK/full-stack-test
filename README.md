
# Project Structure

### Overview

This project is designed as a learning resource for full-stack development, covering both frontend and backend components.

### Folder Structure

```
📂 full-stack-test/
    │-- 📂 nest-back          # Folder Backend use nestjs and prisma
    │-- 📂 next-app           # Folder Frontend use next tailwind and MUI
    │-- README.md              # Project documentation
```

## How to Install

### Prerequisites
Before installing, ensure you have the following installed:

- Install Ubuntu in microsoft store

- Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)

- Install [DbGate](https://dbgate.org/download-community/) or [DBeaver](https://dbeaver.io/download/)

- [Node.js](https://nodejs.org/) (v16 or higher)

- [npm](https://www.npmjs.com/) (comes with Node.js)

- [Prisma](https://www.prisma.io/) CLI (can be installed globally or used locally in the project)

### Clone the repository : 
```bash
git clone https://github.com/Thiraphut-SK/full-stack-test.git
```

## **Database with docker**

#### > **Open Docker Desktop**

### 1. Move to the NestJS project directory:

```bash
cd nestjs-back
```

### 2. Create file ***docker-compose.yml*** in folder 
```
services:
  database:
    image: mysql:8.0
    ports:
      - 3306:3306
    environment:
      - MYSQL_ROOT_PASSWORD=passwordroot
      - MYSQL_USER=user
      - MYSQL_PASSWORD=password
      - MYSQL_DATABASE=db
    volumes:
      - database:/var/lib/mysql
  
volumes:
  database: 
```

### 3. Build file docker 
```bash
docker-compose up -d
```
> **Note: `-d` for run background

### 4. Connect database

#### > **DbGate, Dbeaver or etc.**


## **Backend Install** 

### 1. Move to the NestJS project directory:
```bash
cd nestjs-back
```

### 2. Install Dependencies:
Run the following command to install the required dependencies:
```bash
npm install
```

### 3. Set up the Database with Prisma:
If you have not already set up your database, you can configure it by editing the `prisma/schema.prisma` file with your database connection details.

After setting up the database, run the following command to generate the Prisma client:
```bash
npx prisma generate
```

### 4. Run the Database Migrations (if applicable):

If there are any migrations for the database schema, run:

```bash
npx prisma migrate dev
```
#### **Option**
- `migrate dev` : use in dev and create new migrations.      
- `migrate deploy` : use deploy migrations to production.
- `migrate reset` : use to reset database and reapply all migrations.
- `migrate status` : use to check the status of migrations applied to the database.

### 5. Start the Backend Server:

After everything is set up, you can start the NestJS backend server with:

```bash
npm run start
```
or
```bash
npm run start:dev
```
> dev : when seve not rerun again

By default, the server will run on `http://localhost:8000`.



## **Frontend Install**

### 1. Navigate to the Frontend folder:
Open a terminal and navigate to the `next-app` folder:
```bash
cd next-app
```

### 2. Install Dependencies:

Run the following command to install the required dependencies:
```bash
npm install
```

### 3. Run the Next.js Development Server:

After the dependencies are installed, you can start the Next.js development server with:
```bash
npm run dev
```
By default, the server will run on `http://localhost:3000`.

### 4. Verify the Installation:

Open your browser and visit http://localhost:3000 to ensure that the Next.js application is running successfully.


## Learn More

To learn more about the technologies used in the backend, here are some helpful resources:

### NestJS
- **Official Documentation**: [https://docs.nestjs.com](https://docs.nestjs.com)
- **NestJS GitHub Repository**: [https://github.com/nestjs/nest](https://github.com/nestjs/nest)
- **NestJS YouTube Channel**: [https://www.youtube.com/c/NestJS](https://www.youtube.com/c/NestJS)

NestJS is a powerful Node.js framework built with TypeScript, designed for building scalable and maintainable server-side applications. It leverages modern JavaScript and TypeScript features to provide a robust development experience.

---
### Prisma
- **Official Documentation**: [https://www.prisma.io/docs](https://www.prisma.io/docs)
- **Prisma GitHub Repository**: [https://github.com/prisma/prisma](https://github.com/prisma/prisma)
- **Prisma Data Model Tutorial**: [https://www.prisma.io/docs/guides/database/datamodel](https://www.prisma.io/docs/guides/database/datamodel)

Prisma is an open-source database toolkit that simplifies database access in JavaScript and TypeScript. It provides an ORM (Object-Relational Mapping) layer for interacting with databases, allowing you to manage your database schema, generate queries, and perform migrations.

By using these tools, you can create a high-performance, type-safe backend with minimal effort.

---

### NextJs

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
