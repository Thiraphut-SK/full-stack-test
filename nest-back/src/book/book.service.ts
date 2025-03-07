import { Injectable } from '@nestjs/common';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICreateBook } from './interface/book.interface';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}
  
  async createBook({ name, type, authorId, count }: ICreateBook) {
    return this.prisma.book.create({
      data: { name, type, authorId, count },
    });
  }

  async getBook() {
    return this.prisma.book.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  async deleteBookById(id: number) {
    return this.prisma.book.delete({
      where: { bookId: id },  });
  }
}
