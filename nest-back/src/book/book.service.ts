import { Injectable } from '@nestjs/common';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICreateBook } from './interface/book.interface';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async createBook({ name, type, authorId, count, publishers }: ICreateBook) {
    return this.prisma.book.create({
      data: { name, type, authorId, count, publishers },
    });
  }

  async getBook() {
    const books = await this.prisma.book.findMany({
      include: { author: true },
    });
    return books.map((book) => ({
      ...book,
      typeName: `${book.type} - ${book.name}`, // ✅ Add typeName dynamically
    }));
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  async deleteBookById(id: number) {
    return this.prisma.book.delete({
      where: { bookId: id },
    });
  }
}
