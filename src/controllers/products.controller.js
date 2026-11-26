import * as service from '../services/product.service.js';

export const getProducts = async (req, res) => {
    try {
        const products = await service.listProducts();
        res.status(200).json(products);
    } catch (e) {
        res.status(500).json({
            message: "Error al obtener datos desde la base."
        });
    };
};

export const getProduct = async (req, res) => {
    const { id } = req.params ?? null;
    if (
        !id ||
        typeof id !== 'string'
    ) {
        return res.status(400).json({ message: "ID inválido" });
    };
    try {
        const product = await service.getSingleProduct(id);
        if (!product) {
            return res
                .status(404)
                .json({ message: "No se encontró producto con id indicada" })
        };
        res
            .status(200)
            .json(product);
    } catch (e) {
        res.status(500).json({
            message: "Error al obtener producto."
        });
    };
};

export const createProduct = async (req, res) => {
    const { title, price, stock } = req.body ?? {};

    let validData = true;

    if (!title || typeof title !== 'string' || title.length < 4) validData = false;
    if (!price || typeof price !== 'number' || price < 1) validData = false;
    if (!stock || typeof stock !== 'number' || stock < 1) validData = false;

    if (!validData) return res
        .status(400)
        .json({ message: "Los datos de titulo, precio o stock son inválidos. verificar." })

    try {
        const productId = await service.createProduct({ title, price, stock });
        return res
            .status(200)
            .json({
                ok: true,
                productId: productId
            });
    } catch (e) {
        return res
            .status(500)
            .json({
                message: "Se generó un error al crear el nuevo producto en la base."
            })
    };
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params ?? null;
    try {
        const productDeleted = await service.deleteProduct(id);
        if (productDeleted) {
            return res
                .status(200)
                .json({
                    message: "Producto Eliminado."
                });
        };
        return res
            .status(404)
            .json({
                message: "El producto a eliminar no existe"
            });
    } catch (e) {
        return res.status(500).json({
            message: "Error al eliminar producto."
        });
    };
};