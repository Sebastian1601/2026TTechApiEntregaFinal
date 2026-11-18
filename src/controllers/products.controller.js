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
    try {
        const product = await service.getSingleProduct(id);
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

    if (!title ||
        !price ||
        !stock
    ) {
        return res
            .status(402)
            .json({
                message: "Existen datos inválidos en el ingreso del producto."
            });
    };
    try {
        const newProduct = await service.createProduct({ title, price, stock });
        return res
            .status(200)
            .json({
                ok: true,
                product: newProduct
            });
    } catch (e) {
        return res
            .status(500)
            .json({
                message: "Se generó un error al crear el nuevo producto."
            })
    };
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params ?? null;
    try {
        const product = await service.deleteProduct(id);
        res
            .status(200)
            .json({
                message:"Producto Eliminado."
            });
    } catch (e) {
        res.status(500).json({
            message: "Error al eliminar producto."
        });
    };
};