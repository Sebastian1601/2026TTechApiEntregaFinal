import { Router } from 'express';
import * as pc from '../controllers/products.controller.js';

const router = Router();

router
    .get("/", pc.getProducts)
    .get("/:id", pc.getProduct)
    .post("/", pc.createProduct)
    .delete("/:id", pc.deleteProduct);

export default router;
