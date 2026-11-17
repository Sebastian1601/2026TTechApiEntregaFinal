import { listBooks } from '../services/books.service.js';

export const getBooks = async (req, res) => {
    try {
        const books = await listBooks();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los libros" });
    }
};


export const postBook = async (req, res) => {
    try {
        const { title, price } = req.body ?? {};
        if (
            typeof title !== 'string' ||
            !title.trim() ||
            typeof price !== 'number' ||
            price <= 0
        ) {
            return res.status(400).json({ error: "Título y precio válidos son obligatorios" });
        }

        
    }
}