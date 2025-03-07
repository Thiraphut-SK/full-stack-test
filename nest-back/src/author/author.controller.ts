import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthorService } from './author.service';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('api/author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  createAuthor(@Body() body: { name: string }) {
    return this.authorService.createAuthor(body.name);
  }

  @Get()
  getAuthor() {
    return this.authorService.getAuthor();
  }

  @Get(':id')
  getAuthorById(@Param('id') id: string) {
    return this.authorService.getAuthorById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(+id, updateAuthorDto);
  }

  @Delete(':id')
  deleteAuthorById(@Param('id') id: string) {
    return this.authorService.deleteAuthorById(+id);
  }
}
