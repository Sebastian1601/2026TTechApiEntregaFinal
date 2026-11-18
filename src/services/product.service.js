import {
    listAllProducts,
    listSingleProduct,
    deleteSingleProduct,
    createSingleProduct
} from '../models/products.model.js';

export async function listProducts() {
    return await listAllProducts();
};

export async function getSingleProduct(id) {
    return await listSingleProduct(id);
};

export async function createProduct(data){
    return await createSingleProduct(data);
};

export async function deleteProduct(id) {
    return await deleteSingleProduct(id);
};