import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorModule } from './author/author.module';
import { PrismaModule } from './prisma/prisma.module';
import { BookModule } from './book/book.module';

@Module({
  imports: [AuthorModule, PrismaModule, BookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
