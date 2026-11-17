import { getAllBooks } from '../models/books.model.js';

export const listBooks = async () => {
    return await getAllBooks();
};