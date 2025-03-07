import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) {}
  
  async createAuthor(name: string) {
    return this.prisma.author.create({
      data: { name },
    });
  }

  async getAuthor() {
    return this.prisma.author.findMany();
  }

  async getAuthorById(id: number){
    return this.prisma.author.findUnique({
      where: { authorId: id }, });
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return `This action updates a #${id} author`;
  }

  async deleteAuthorById(id: number) {
    const author = await this.prisma.author.findUnique({
      where: { authorId: id },
    });

    if (!author) {
      throw new NotFoundException('Author not found');
    }

    // Step 2: Check if the author has any associated books
    const books = await this.prisma.book.findMany({
      where: { authorId: id },
    });

    if (books.length > 0) {
      throw new ForbiddenException('Cannot delete author with associated books');
    }

    // Step 3: Proceed with deletion if no books are found
    await this.prisma.author.delete({
      where: { authorId: id },
    });

    return { message: 'Author deleted successfully' };
  }
}
