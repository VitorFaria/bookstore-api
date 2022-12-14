import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './book.model';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book)
    private bookModel: typeof Book,
  ) {}

  async getAll(): Promise<Book[]> {
    return this.bookModel.findAll();
  }

  async getOne(id: number): Promise<Book> {
    return this.bookModel.findByPk(id);
  }

  async create(book: Book) {
    this.bookModel.create(book);
  }

  async update(book: Book, id: number): Promise<[number, Book[]]> {
    return this.bookModel.update(book, {
      returning: true,
      where: { id: id },
    });
  }

  async delete(id: number) {
    const book = await this.getOne(id);
    book.destroy();
  }
}
