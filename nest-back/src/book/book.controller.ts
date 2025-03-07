import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookService } from './book.service';
import { UpdateBookDto } from './dto/update-book.dto';
import { ICreateBook } from './interface/book.interface';

@Controller('api/book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  createBook(@Body() body: ICreateBook) {
    return this.bookService.createBook(body);
  }

  @Get()
  getBook() {
    return this.bookService.getBook();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.deleteBookById(+id);
  }
}
