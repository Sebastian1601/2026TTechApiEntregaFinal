import express from 'express';
import cors from 'cors';

import './src/config/firebase.js'; //esto llama al modulo que carga el .env por lo tanto, las variables de entorno quedan disponibles para el resto de la aplicacion

import productRouter from './src/routes/product.router.js';
import authRouter from './src/routes/auth.router.js';

const app = express();

app.use(cors());
app.use(express.json());

//rutas de requerimiento
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);

//hanlder de rutas no existentes
app.use((req, res) => {
    return res.status(404).json({
        message: "Ruta no válida. Verifique la dirección de la petición."
    })
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en http://127.0.0.1:${process.env.PORT}`);
});
