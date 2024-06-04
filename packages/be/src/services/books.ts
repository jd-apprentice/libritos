import { Query } from "../@types"
import { findBookById, findAllBooks } from "../repositories/books"

class BookService {

    async findAll(query: Query) {
        return findAllBooks(query)
    }

    async findById(id: number) {
        return findBookById(id)
    }

}

const bookService = new BookService()
export { bookService }