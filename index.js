import express from 'express';
import cors from 'cors';
import booksRouter from './src/routes/books.router.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "API de libros funcionando"
    });
});

app.use("api/books", booksRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server up and running on http://127.0.0.1:${process.env.PORT}`);
});
