import express from 'express';
import cors from 'cors';

import './src/config/firebase.js'; //esto llama al modulo que carga el .env por lo tanto, las variables de entorno quedan disponibles para el resto de la aplicacion

import productRouter from './src/routes/products.routes.js';
import authRouter from './src/routes/auth.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ 
            status: "error", 
            message: "El cuerpo de la petición no es un JSON válido." 
        });
    }
    next();
});

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

