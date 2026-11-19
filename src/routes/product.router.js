import { Router } from 'express';
import * as pc from '../controllers/products.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

router
    .get("/", pc.getProducts)
    .get("/:id", pc.getProduct)
    .post("/", verifyToken, pc.createProduct)
    .delete("/:id", verifyToken, pc.deleteProduct);

export default router;
