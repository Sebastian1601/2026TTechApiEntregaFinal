import { Router } from 'express';
import * as ac from '../controllers/auth.controller.js';


const router = Router();

router.post("/login", ac.login);

export default router;