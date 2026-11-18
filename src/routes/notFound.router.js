import { Router } from 'express';


const router = Router();

router.use("*", (req, res) => {
    return res.status(404).json({
        message: "Route not found. check for incorrect spelling routes."
    });
});

export default router;